import { auth } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/services/dashboard";
import { Bell, Newspaper, Calendar, Download, Image as ImageIcon, Users, ShieldAlert, ArrowUpRight, ExternalLink, Plus, Mail } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-serif text-[#022448]">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Welcome back, <span className="font-bold text-[#225eaa]">{session?.user?.name || session?.user?.email}</span>
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className="relative z-10 inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 shrink-0"
        >
          <Plus size={16} />
          <span>Publish Notice</span>
        </Link>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Link href="/admin/messages" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-[#225eaa]/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <Mail className="text-[#225eaa] mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">Enquiries</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.messages}</h3>
        </Link>

        <Link href="/admin/notices" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-[#225eaa]/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <Bell className="text-[#225eaa] mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">Notices</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.notices}</h3>
        </Link>

        <Link href="/admin/news" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-emerald-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <Newspaper className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">News</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.news}</h3>
        </Link>

        <Link href="/admin/events" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <Calendar className="text-purple-600 mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">Events</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.events}</h3>
        </Link>

        <Link href="/admin/downloads" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <Download className="text-blue-600 mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">Downloads</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.downloads}</h3>
        </Link>

        <Link href="/admin/gallery" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-pink-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <ImageIcon className="text-pink-600 mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">Gallery</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.gallery}</h3>
        </Link>

        <Link href="/admin/staff" className="bg-white border border-slate-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:border-indigo-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150 pointer-events-none"></div>
          <Users className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform relative z-10" size={26} />
          <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider truncate relative z-10">Staff</span>
          <h3 className="text-2xl font-bold text-[#022448] mt-2 relative z-10">{data.counts.staff}</h3>
        </Link>
      </div>

      {/* Main Grid: Recent Notices & Campus Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Notices Table */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Bell className="text-[#225eaa]" size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#022448]">Recently Published Notices</h2>
            </div>
            <Link href="/admin/notices" className="text-xs font-bold text-[#225eaa] hover:text-[#022448] uppercase tracking-wider flex items-center gap-1 transition-colors">
              View All <ArrowUpRight size={16} />
            </Link>
          </div>

          {data.recentNotices.length === 0 ? (
            <p className="text-sm text-slate-500 py-10 text-center font-medium">No notices published yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="pb-4 px-3">Notice Title</th>
                    <th className="pb-4 px-3">Category</th>
                    <th className="pb-4 px-3">Date</th>
                    <th className="pb-4 px-3 text-right">File</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.recentNotices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-3 font-semibold text-[#022448] max-w-xs truncate">{notice.title}</td>
                      <td className="py-4 px-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-[#225eaa] border border-blue-100">
                          {notice.type}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-500 font-medium">{new Date(notice.publishedAt).toLocaleDateString("en-IN")}</td>
                      <td className="py-4 px-3 text-right">
                        {notice.fileUrl ? (
                          <a
                            href={notice.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 text-[#225eaa] hover:bg-blue-50 transition-colors"
                          >
                            PDF <ExternalLink size={14} />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: News & Events Feeds */}
        <div className="space-y-6">
          {/* Latest News */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Newspaper className="text-emerald-600" size={18} />
                </div>
                <h2 className="text-base font-bold text-[#022448]">Latest News</h2>
              </div>
              <Link href="/admin/news" className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors">
                Manage
              </Link>
            </div>

            {data.recentNews.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center font-medium">No news articles found.</p>
            ) : (
              <div className="space-y-4">
                {data.recentNews.map((item) => (
                  <div key={item.id} className="text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0 group">
                    <p className="font-semibold text-[#022448] leading-relaxed truncate group-hover:text-emerald-600 transition-colors">{item.title}</p>
                    <span className="text-xs text-slate-400 font-medium mt-1 block">{new Date(item.publishedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Calendar className="text-purple-600" size={18} />
                </div>
                <h2 className="text-base font-bold text-[#022448]">Upcoming Events</h2>
              </div>
              <Link href="/admin/events" className="text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors">
                Manage
              </Link>
            </div>

            {data.recentEvents.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center font-medium">No events scheduled.</p>
            ) : (
              <div className="space-y-4">
                {data.recentEvents.map((item) => (
                  <div key={item.id} className="text-sm flex items-start justify-between gap-4 group">
                    <span className="font-semibold text-[#022448] leading-relaxed group-hover:text-purple-600 transition-colors truncate">{item.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-50 text-slate-500 shrink-0 border border-slate-100">
                      {new Date(item.eventDate).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Audit Log Feed */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 rounded-lg">
            <ShieldAlert className="text-[#022448]" size={20} />
          </div>
          <h2 className="text-lg font-bold text-[#022448]">Recent Admin Activity</h2>
        </div>

        {data.recentAudits.length === 0 ? (
          <p className="text-sm text-slate-500 py-8 text-center font-medium">No recent admin mutation logs found.</p>
        ) : (
          <div className="divide-y divide-slate-50">
            {data.recentAudits.map((audit) => (
              <div key={audit.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm hover:bg-slate-50/50 transition-colors rounded-lg px-2 -mx-2">
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="font-bold text-[#022448]">{audit.adminEmail}</span>
                  <span className="text-slate-400 font-medium">performed</span>
                  <span className="font-bold text-[#225eaa] uppercase tracking-wider text-xs px-2 py-0.5 bg-blue-50 rounded border border-blue-100">{audit.action}</span>
                  <span className="text-slate-400 font-medium">on</span>
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">{audit.resource}</span>
                </div>
                <span className="text-slate-400 font-medium text-xs whitespace-nowrap bg-white px-2 py-1 rounded border border-slate-100">
                  {new Date(audit.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
