"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Bell, Newspaper, Calendar, Download, Image as ImageIcon, Users, Briefcase, LogOut, ArrowUpRight, Mail, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/admin", label: "Overview", icon: Shield },
  { href: "/admin/messages", label: "Enquiries / Inbox", icon: Mail },
  { href: "/admin/notices", label: "Notices", icon: Bell },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/downloads", label: "Downloads", icon: Download },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/staff", label: "Staff Directory", icon: Users },
  { href: "/admin/placements", label: "Placements & CSV", icon: Briefcase },
];

export default function AdminMobileNav({ userName, userEmail }: { userName: string; userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0f2552] text-white p-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold shadow-sm">
            <Shield size={18} className="text-blue-300" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white leading-tight">KGEC Admin</h2>
            <span className="text-[9px] text-blue-200/80 font-semibold block uppercase tracking-wider">Control Panel</span>
          </div>
        </div>
        
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
          aria-label="Open admin menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-[#0f2552] text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h2 className="text-sm font-bold">Admin Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close admin menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <nav className="space-y-1 text-xs font-medium">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link 
                key={href} 
                href={href} 
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                  pathname === href ? "bg-white/20 text-white font-bold" : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-3 bg-[#0a1730]">
          <Link href="/" target="_blank" className="flex items-center justify-between px-3.5 py-2 rounded-xl text-[11px] font-semibold text-blue-200 hover:bg-white/10 transition-colors">
            <span>View Live Website</span>
            <ArrowUpRight size={14} />
          </Link>

          <div className="px-3.5 py-2.5 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-xs font-bold text-white truncate">{userName}</p>
            <p className="text-[10px] text-blue-200/70 truncate">{userEmail}</p>
          </div>

          <Link href="/api/v1/auth/signout" className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-colors">
            <LogOut size={16} />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </>
  );
}
