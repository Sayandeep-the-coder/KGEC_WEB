import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, Bell, Newspaper, Calendar, Download, Image as ImageIcon, Users, Briefcase, LogOut, ArrowUpRight, Mail } from "lucide-react";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If unauthenticated or no session, redirect to login
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans w-full overflow-hidden">
      <AdminMobileNav userName={session.user.name || session.user.email || "Admin"} userEmail={session.user.email || ""} />

      {/* Sidebar Nav */}
      <aside className="w-64 bg-[#022448] text-white border-r border-slate-800/10 p-6 shrink-0 hidden md:flex flex-col justify-between shadow-2xl relative z-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#225eaa]/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10 px-2">
            <div className="w-12 h-12 rounded-[1rem] bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-inner backdrop-blur-md">
              <Shield size={24} className="text-blue-300 drop-shadow-md" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">KGEC Admin</h2>
              <span className="text-[10px] text-blue-300 font-bold block uppercase tracking-widest mt-0.5 opacity-80">Control Panel</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-bold tracking-wide">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Shield size={18} className="group-hover:scale-110 transition-transform" />
              <span>Overview</span>
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
              <span>Enquiries / Inbox</span>
            </Link>
            <Link href="/admin/notices" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Bell size={18} className="group-hover:scale-110 transition-transform" />
              <span>Notices</span>
            </Link>
            <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Newspaper size={18} className="group-hover:scale-110 transition-transform" />
              <span>News</span>
            </Link>
            <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Calendar size={18} className="group-hover:scale-110 transition-transform" />
              <span>Events</span>
            </Link>
            <Link href="/admin/downloads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Download size={18} className="group-hover:scale-110 transition-transform" />
              <span>Downloads</span>
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
              <span>Gallery</span>
            </Link>
            <Link href="/admin/staff" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Users size={18} className="group-hover:scale-110 transition-transform" />
              <span>Staff Directory</span>
            </Link>
            <Link href="/admin/placements" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-[#225eaa] hover:text-white hover:shadow-md transition-all group">
              <Briefcase size={18} className="group-hover:scale-110 transition-transform" />
              <span>Placements & CSV</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-4 relative z-10">
          <Link href="/" target="_blank" className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold text-blue-200 hover:bg-white/10 hover:text-white transition-colors group">
            <span>Live Website</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">
            <p className="text-xs font-bold text-white truncate mb-0.5">{session.user.name || session.user.email}</p>
            <p className="text-[10px] font-medium text-blue-200/80 truncate">{session.user.email}</p>
          </div>

          <Link href="/api/v1/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all group">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 bg-slate-50 w-full relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-200/50 to-transparent pointer-events-none z-0"></div>
        <div className="relative z-10 max-w-[100rem] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
