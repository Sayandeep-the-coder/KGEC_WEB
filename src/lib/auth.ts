import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import "next-auth/jwt";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: {
      adminId?: string;
      adminEmail?: string;
      adminName?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    adminId?: string;
    adminEmail?: string;
    adminName?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    adminId?: string;
    adminEmail?: string;
    adminName?: string | null;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  basePath: "/api/v1/auth",
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: (() => {
    const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
    if (!secret && process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET or AUTH_SECRET must be set in production");
    }
    return secret || "kgec-dev-only-secret-not-for-production";
  })(),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/access-denied",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (!user.email) return false;

      try {
        const [admin] = await db
          .select()
          .from(adminAllowlist)
          .where(eq(adminAllowlist.email, user.email.toLowerCase()));

        if (!admin) {
          return "/admin/access-denied";
        }

        return true;
      } catch (err) {
        console.error("Auth signIn query error:", err);
        return false; // fail-closed: deny login if allowlist cannot be verified
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.adminId = user.adminId || token.sub;
        token.adminEmail = (user.email || token.email) ?? undefined;
        token.adminName = (user.name || token.name) ?? undefined;
      } else if (token.email && !token.adminId) {
        try {
          const [admin] = await db
            .select()
            .from(adminAllowlist)
            .where(eq(adminAllowlist.email, token.email.toLowerCase()));

          if (admin) {
            token.adminId = admin.id;
            token.adminEmail = admin.email ?? undefined;
            token.adminName = admin.name ?? undefined;
          }
        } catch (err) {
          console.error("Auth jwt db lookup error:", err);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        if (token.adminId) session.user.adminId = token.adminId as string;
        if (token.adminEmail) {
          session.user.adminEmail = token.adminEmail as string;
          session.user.email = token.adminEmail as string;
        }
        if (token.adminName) {
          session.user.adminName = token.adminName as string;
          session.user.name = token.adminName as string;
        }
      }
      return session;
    },
  },
});
