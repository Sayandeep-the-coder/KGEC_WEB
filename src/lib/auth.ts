import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
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
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-google-client-secret",
    }),
    Credentials({
      id: "credentials",
      name: "Allowlisted Admin Email",
      credentials: {
        email: { label: "Admin Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email || typeof credentials.email !== "string") {
          return null;
        }

        const cleanEmail = credentials.email.trim().toLowerCase();

        const [admin] = await db
          .select()
          .from(adminAllowlist)
          .where(eq(adminAllowlist.email, cleanEmail));

        if (!admin) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name || "KGEC Administrator",
          adminId: admin.id,
          adminEmail: admin.email,
          adminName: admin.name || "KGEC Administrator",
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "kgec-development-secret-key-32-chars-long",

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

      const [admin] = await db
        .select()
        .from(adminAllowlist)
        .where(eq(adminAllowlist.email, user.email.toLowerCase()));

      if (!admin) {
        return "/admin/access-denied";
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.adminId = user.adminId || token.sub;
        token.adminEmail = (user.email || token.email) ?? undefined;
        token.adminName = (user.name || token.name) ?? undefined;
      } else if (token.email) {
        const [admin] = await db
          .select()
          .from(adminAllowlist)
          .where(eq(adminAllowlist.email, token.email.toLowerCase()));

        if (admin) {
          token.adminId = admin.id;
          token.adminEmail = admin.email ?? undefined;
          token.adminName = admin.name ?? undefined;
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
