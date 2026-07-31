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

/**
 * NextAuth.js v5 (Auth.js) configuration.
 *
 * Auth flow:
 * 1. User clicks Login → redirected to Google consent screen
 * 2. Google redirects back to /api/v1/auth/[...nextauth]/callback/google
 * 3. signIn callback checks if the email is on admin_allowlist
 * 4. If allowlisted → JWT session created with admin info
 * 5. If not → sign-in is rejected, user sees access-denied
 */

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-google-client-secret",
    }),
  ],

  // Use the versioned API path for all auth routes
  basePath: "/api/v1/auth",
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "kgec-development-secret-key-32-chars-long",

  session: {
    strategy: "jwt",
    // 30-day sessions
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/access-denied",
  },

  callbacks: {
    /**
     * Gate sign-in on the admin_allowlist table.
     * Only emails present in admin_allowlist can sign in.
     */
    async signIn({ user }) {
      if (!user.email) return false;

      const [admin] = await db
        .select()
        .from(adminAllowlist)
        .where(eq(adminAllowlist.email, user.email.toLowerCase()));

      if (!admin) {
        // Redirect to access-denied with a query param
        return "/admin/access-denied";
      }

      return true;
    },

    /**
     * Attach admin ID and email to the JWT for downstream use.
     */
    async jwt({ token, user }) {
      if (user?.email) {
        const [admin] = await db
          .select()
          .from(adminAllowlist)
          .where(eq(adminAllowlist.email, user.email.toLowerCase()));

        if (admin) {
          token.adminId = admin.id;
          token.adminEmail = admin.email;
          token.adminName = admin.name;
        }
      }
      return token;
    },

    /**
     * Expose admin info on the session object.
     */
    async session({ session, token }) {
      if (token.adminId) {
        session.user.adminId = token.adminId as string;
        session.user.adminEmail = token.adminEmail as string;
        session.user.adminName = (token.adminName as string) || null;
      }
      return session;
    },
  },
});
