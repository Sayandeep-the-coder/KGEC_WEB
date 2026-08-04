import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[#022448] skew-y-3 -mt-32 -z-10 shadow-2xl"></div>

      <div className="w-full max-w-md bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 -z-10"></div>

        <div className="w-20 h-20 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-8 shadow-inner border border-red-100 z-10 relative">
          <ShieldAlert size={40} />
        </div>

        <h1 className="text-3xl font-bold font-serif text-[#022448] mb-3 relative z-10">Access Denied</h1>
        <p className="text-sm text-[#43474e] font-medium leading-relaxed mb-8 relative z-10">
          This account is not authorized for administrative access. Only email addresses registered in <code className="text-[#225eaa] font-mono font-bold px-1.5 py-0.5 bg-blue-50 rounded">admin_allowlist</code> can log in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            href="/admin/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-900/20"
          >
            <LogIn size={16} />
            <span>Try Admin Login</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#022448] font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
