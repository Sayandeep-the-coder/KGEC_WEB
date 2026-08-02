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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>COMMUNICATION INBOX</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">
            Contact Enquiries & Messages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time messages submitted via the public contact form at /contact.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-sm self-start cursor-pointer disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Messages List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or message..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex justify-between items-center">
            <span>All Messages ({filteredMessages.length})</span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-400 text-xs space-y-2">
              <RefreshCw size={24} className="animate-spin mx-auto text-blue-500" />
              <p>Loading enquiries...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs space-y-3">
              <Inbox size={32} className="mx-auto text-slate-300" />
              <p className="font-semibold text-slate-600">No messages found</p>
              <p className="text-[11px]">Enquiries submitted through /contact will show up here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-150 overflow-y-auto pr-1">
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
                    className={`p-3.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50/80 border border-blue-200 text-slate-900 shadow-sm"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold truncate text-slate-900">{m.name}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">{formattedDate}</span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-medium truncate mb-1.5">{m.email}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{m.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Message Detail View */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm min-h-105 flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Detail Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-700 font-bold flex items-center justify-center text-base uppercase">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedMessage.name}</h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedMessage.email}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Regarding your enquiry at KGEC&body=Dear ${selectedMessage.name},%0D%0A%0D%0A`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0f2552] text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-sm"
                  >
                    <Mail size={14} />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={(e) => handleDelete(selectedMessage.id, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete enquiry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Detail Timestamp */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock size={14} />
                <span>
                  Received on{" "}
                  {new Date(selectedMessage.submittedAt).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Message Content Body */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400 text-xs space-y-3 m-auto">
              <Mail size={40} className="mx-auto text-slate-300" />
              <p className="font-semibold text-slate-700">Select an enquiry to preview</p>
              <p className="text-[11px]">Click on any item in the left list to read the full message.</p>
            </div>
          )}

          {selectedMessage && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Message ID: {selectedMessage.id}</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                ● Stored in Database
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
