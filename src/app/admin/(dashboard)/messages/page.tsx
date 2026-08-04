"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Search,
  Trash2,
  ExternalLink,
  Clock,
  Inbox,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    let ignore = false;
    const loadInitialMessages = async () => {
      try {
        const res = await fetch("/api/v1/contact");
        const json = await res.json();
        if (res.ok && json.data && !ignore) {
          setMessages(json.data);
          setSelectedMessage(prev => prev || (json.data.length > 0 ? json.data[0] : null));
        }
      } catch (err) {
        console.error("Failed to fetch contact messages:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    loadInitialMessages();
    return () => { ignore = true; };
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/contact");
      const json = await res.json();
      if (res.ok && json.data) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error("Failed to refresh contact messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await fetch(`/api/v1/contact?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updated = messages.filter((m) => m.id !== id);
        setMessages(updated);
        if (selectedMessage?.id === id) {
          setSelectedMessage(updated[0] || null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#225eaa] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <Sparkles size={14} />
            <span>COMMUNICATION INBOX</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-[#022448]">
            Contact Enquiries
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Real-time messages submitted via the public contact form.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="relative z-10 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-slate-200 text-[#022448] hover:border-[#225eaa] hover:text-[#225eaa] text-xs font-bold uppercase tracking-wider transition-all shadow-sm self-start sm:self-center cursor-pointer disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Messages List */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or message..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#022448] font-medium placeholder-slate-400 focus:bg-white focus:border-[#225eaa] focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
            />
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 flex justify-between items-center border-b border-slate-100 pb-2">
            <span>All Messages ({filteredMessages.length})</span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 text-sm font-medium space-y-4">
              <RefreshCw size={28} className="animate-spin mx-auto text-[#225eaa]" />
              <p>Loading enquiries...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-sm space-y-4">
              <Inbox size={40} className="mx-auto text-slate-300" />
              <p className="font-bold text-[#022448]">No messages found</p>
              <p className="text-xs font-medium">Enquiries submitted through /contact will show up here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredMessages.map((m) => {
                const isSelected = selectedMessage?.id === m.id;
                const formattedDate = new Date(m.submittedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMessage(m)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50 border border-blue-100 text-[#022448]"
                        : "hover:bg-slate-50 border border-transparent text-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h4 className="text-sm font-bold truncate text-[#022448]">{m.name}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-bold uppercase tracking-wider">{formattedDate}</span>
                    </div>
                    <p className="text-xs text-[#225eaa] font-bold truncate mb-2">{m.email}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">{m.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Message Detail View */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 shadow-sm min-h-[600px] flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-8">
              {/* Detail Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#225eaa] font-bold flex items-center justify-center text-xl uppercase shadow-inner">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#022448]">{selectedMessage.name}</h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm font-bold text-[#225eaa] hover:text-[#022448] transition-colors flex items-center gap-2 mt-1"
                    >
                      <span>{selectedMessage.email}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Regarding your enquiry at KGEC&body=Dear ${selectedMessage.name},%0D%0A%0D%0A`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#022448] hover:bg-[#225eaa] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-900/10 hover:-translate-y-0.5"
                  >
                    <Mail size={16} />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={(e) => handleDelete(selectedMessage.id, e)}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
                    title="Delete enquiry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Detail Timestamp */}
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                <div className="p-2 rounded-lg bg-slate-50">
                  <Clock size={16} />
                </div>
                <span>
                  Received on{" "}
                  <span className="text-[#022448]">
                    {new Date(selectedMessage.submittedAt).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              </div>

              {/* Message Content Body */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">Message Content</h3>
                <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 sm:p-8 text-sm text-[#022448] font-medium leading-loose whitespace-pre-wrap shadow-inner">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-32 text-center text-slate-400 text-sm space-y-4 m-auto">
              <Mail size={48} className="mx-auto text-slate-300" />
              <p className="font-bold text-[#022448] text-lg">Select an enquiry to preview</p>
              <p className="font-medium">Click on any item in the left list to read the full message.</p>
            </div>
          )}

          {selectedMessage && (
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-8">
              <span>ID: {selectedMessage.id}</span>
              <span className="text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Stored in Database
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
