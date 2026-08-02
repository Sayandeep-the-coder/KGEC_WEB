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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans w-full">
      <AdminMobileNav userName={session.user.name || session.user.email || "Admin"} userEmail={session.user.email || ""} />

      {/* Sidebar Nav */}
      <aside className="w-64 bg-[#0f2552] text-white border-r border-slate-800/10 p-6 shrink-0 hidden md:flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold shadow-sm">
              <Shield size={22} className="text-blue-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-snug">KGEC Admin</h2>
              <span className="text-[10px] text-blue-200/80 font-semibold block uppercase tracking-wider">Control Panel</span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <Link href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Shield size={16} />
              <span>Overview</span>
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Mail size={16} />
              <span>Enquiries / Inbox</span>
            </Link>
            <Link href="/admin/notices" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Bell size={16} />
              <span>Notices</span>
            </Link>
            <Link href="/admin/news" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Newspaper size={16} />
              <span>News</span>
            </Link>
            <Link href="/admin/events" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Calendar size={16} />
              <span>Events</span>
            </Link>
            <Link href="/admin/downloads" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Download size={16} />
              <span>Downloads</span>
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <ImageIcon size={16} />
              <span>Gallery</span>
            </Link>
            <Link href="/admin/staff" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Users size={16} />
              <span>Staff Directory</span>
            </Link>
            <Link href="/admin/placements" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-white/10 hover:text-white transition-all">
              <Briefcase size={16} />
              <span>Placements & CSV</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link href="/" target="_blank" className="flex items-center justify-between px-3.5 py-2 rounded-xl text-[11px] font-semibold text-blue-200 hover:bg-white/10 transition-colors">
            <span>View Live Website</span>
            <ArrowUpRight size={14} />
          </Link>

          <div className="px-3.5 py-2.5 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-xs font-bold text-white truncate">{session.user.name || session.user.email}</p>
            <p className="text-[10px] text-blue-200/70 truncate">{session.user.email}</p>
          </div>

          <Link href="/api/v1/auth/signout" className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-colors">
            <LogOut size={16} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 bg-slate-50 w-full">
        {children}
      </main>
    </div>
  );
}
