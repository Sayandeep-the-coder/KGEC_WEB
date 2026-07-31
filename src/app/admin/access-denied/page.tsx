import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-center">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldAlert size={36} />
        </div>

        <h1 className="text-2xl font-bold font-serif text-slate-900 mb-2">Access Denied</h1>
        <p className="text-xs text-slate-500 leading-relaxed mb-8">
          This account is not authorized for administrative access. Only email addresses registered in <code className="text-slate-700 font-mono font-semibold">admin_allowlist</code> can log in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/admin/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-md"
          >
            <LogIn size={14} />
            <span>Try Admin Login</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
