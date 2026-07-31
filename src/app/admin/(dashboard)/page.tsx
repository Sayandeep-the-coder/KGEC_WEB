import { auth } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/services/dashboard";
import { Bell, Newspaper, Calendar, Download, Image as ImageIcon, Users, ShieldAlert, ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  const data = await getAdminDashboardData();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-800">{session?.user?.name || session?.user?.email}</span>
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2552] hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0 shadow-md"
        >
          <Plus size={16} />
          <span>Publish Notice</span>
        </Link>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/admin/notices" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group">
          <Bell className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xs text-slate-500 block font-semibold">Notices</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.counts.notices}</h3>
        </Link>

        <Link href="/admin/news" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all group">
          <Newspaper className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xs text-slate-500 block font-semibold">News</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.counts.news}</h3>
        </Link>

        <Link href="/admin/events" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all group">
          <Calendar className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xs text-slate-500 block font-semibold">Events</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.counts.events}</h3>
        </Link>

        <Link href="/admin/downloads" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all group">
          <Download className="text-amber-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xs text-slate-500 block font-semibold">Downloads</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.counts.downloads}</h3>
        </Link>

        <Link href="/admin/gallery" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-500/50 transition-all group">
          <ImageIcon className="text-pink-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xs text-slate-500 block font-semibold">Gallery</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.counts.gallery}</h3>
        </Link>

        <Link href="/admin/staff" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all group">
          <Users className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
          <span className="text-xs text-slate-500 block font-semibold">Staff</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{data.counts.staff}</h3>
        </Link>
      </div>

      {/* Main Grid: Recent Notices & Campus Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Notices Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Bell className="text-blue-600" size={20} />
              <h2 className="text-base font-bold text-slate-900">Recently Published Notices</h2>
            </div>
            <Link href="/admin/notices" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          {data.recentNotices.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">No notices published yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="pb-3 px-2">Notice Title</th>
                    <th className="pb-3 px-2">Category</th>
                    <th className="pb-3 px-2">Date</th>
                    <th className="pb-3 px-2 text-right">File</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.recentNotices.map((notice) => (
                    <tr key={notice.id}>
                      <td className="py-3 px-2 font-semibold text-slate-900 max-w-xs truncate">{notice.title}</td>
                      <td className="py-3 px-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {notice.type}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-slate-500">{new Date(notice.publishedAt).toLocaleDateString("en-IN")}</td>
                      <td className="py-3 px-2 text-right">
                        {notice.fileUrl ? (
                          <a
                            href={notice.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                          >
                            PDF <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400">—</span>
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Newspaper className="text-emerald-600" size={18} />
                <h2 className="text-sm font-bold text-slate-900">Latest News</h2>
              </div>
              <Link href="/admin/news" className="text-[11px] font-semibold text-emerald-600 hover:underline">
                Manage
              </Link>
            </div>

            {data.recentNews.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No news articles found.</p>
            ) : (
              <div className="space-y-3">
                {data.recentNews.map((item) => (
                  <div key={item.id} className="text-xs border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                    <p className="font-semibold text-slate-900 leading-snug truncate">{item.title}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(item.publishedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-purple-600" size={18} />
                <h2 className="text-sm font-bold text-slate-900">Upcoming Events</h2>
              </div>
              <Link href="/admin/events" className="text-[11px] font-semibold text-purple-600 hover:underline">
                Manage
              </Link>
            </div>

            {data.recentEvents.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No events scheduled.</p>
            ) : (
              <div className="space-y-3">
                {data.recentEvents.map((item) => (
                  <div key={item.id} className="text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-900 truncate pr-2">{item.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="text-blue-600" size={20} />
          <h2 className="text-base font-bold text-slate-900">Recent Admin Activity Audit Log</h2>
        </div>

        {data.recentAudits.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No recent admin mutation logs found.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.recentAudits.map((audit) => (
              <div key={audit.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-900">{audit.adminEmail}</span>
                  <span className="text-slate-500"> performed </span>
                  <span className="font-bold text-blue-600 uppercase">{audit.action}</span>
                  <span className="text-slate-500"> on </span>
                  <span className="font-medium text-slate-700">{audit.resource}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  {new Date(audit.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
