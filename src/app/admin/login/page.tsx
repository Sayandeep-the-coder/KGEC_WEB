"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        redirect: false,
        callbackUrl: "/admin",
      });

      if (res?.error) {
        setErrorMsg("Access Denied: Email address is not authorized in admin_allowlist.");
      } else if (res?.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg("Authentication failed. Please check your credentials.");
      }
    } catch {
      setErrorMsg("Network error during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldCheck size={36} />
        </div>

        <h1 className="text-2xl font-bold font-serif text-slate-900 text-center mb-2">KGEC Admin Portal</h1>
        <p className="text-xs text-slate-500 leading-relaxed text-center mb-6">
          Secure, allowlist-gated content management system for Kalyani Government Engineering College.
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Email Allowlist Sign In Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Authorized Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. jitsaha951@gmail.com"
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 transition-colors"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Verifying Authorization..." : "Sign In to Admin Portal"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            or OAuth
          </span>
          <div className="border-t border-slate-200 w-full"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full py-3 px-6 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p className="mt-6 text-center text-[11px] text-slate-500">
          Only authorized emails in <code className="text-slate-700 font-mono font-semibold">admin_allowlist</code> can access.
        </p>
      </div>
    </div>
  );
}
