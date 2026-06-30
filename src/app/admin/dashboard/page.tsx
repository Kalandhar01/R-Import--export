"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  country: string | null;
  subject: string | null;
  services: string | null;
  message: string | null;
  read: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const loadSubmissions = useCallback(async (f: string, s: string) => {
    const params = new URLSearchParams();
    if (f !== "all") params.set("read", f);
    if (s) params.set("search", s);

    const res = await fetch(`/api/submissions?${params}`);
    if (!res.ok) {
      if (res.status === 401) router.push("/admin");
      throw new Error("Failed to fetch");
    }
    return await res.json() as Submission[];
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await loadSubmissions(filter, search);
        if (!cancelled) setSubmissions(data);
      } catch {
        // silent
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [filter, search, loadSubmissions]);

  const refresh = async () => {
    try {
      const data = await loadSubmissions(filter, search);
      setSubmissions(data);
    } catch {
      // silent
    }
  };

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    refresh();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="RACTYSH EXIM PVT LTD"
            width={120}
            height={34}
            className="h-8 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-[#0f172a]">
              RACTYSH EXIM PVT LTD <span className="text-[#111827]">Admin</span>
            </h1>
            <p className="text-[10px] text-[#6b7280]">Trade Inquiries</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/our-works"
            className="rounded border border-[#e5e7eb] px-4 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
          >
            Our Works
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#0f172a]">Submissions</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#111827]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#111827]">
                {unreadCount} unread
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-1.5">
              {(["all", "false", "true"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setLoading(true); }}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    filter === f
                      ? "bg-[#111827] text-white shadow-sm"
                      : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f8f7f4]"
                  }`}
                >
                  {f === "all" ? "All" : f === "false" ? "Unread" : "Read"}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search name, email, subject..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setLoading(true); }}
              className="h-10 w-56 border border-[#e5e7eb] bg-white px-4 text-sm text-[#0f172a] outline-none focus:border-[#111827]"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#e5e7eb] border-t-[#111827]" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#6b7280]">No submissions found</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f8f7f4]">
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Name</th>
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Subject</th>
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Email</th>
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Country</th>
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Date</th>
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Status</th>
                  <th className="px-4 py-3.5 font-semibold text-[#0f172a]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-b border-[#e5e7eb] last:border-0 transition-colors hover:bg-[#fafaf9]">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f172a] text-xs font-bold text-white">
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-[#0f172a]">{s.name}</div>
                          {s.company && (
                            <div className="text-[11px] text-[#9ca3af]">{s.company}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="max-w-[180px] truncate block text-[#0f172a]">
                        {s.subject || "General Inquiry"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <a href={`mailto:${s.email}`} className="text-[#6b7280] transition hover:text-[#111827]">
                        {s.email}
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      {s.country ? (
                        <span className="text-[#6b7280]">{s.country}</span>
                      ) : (
                        <span className="text-[#d1d5db]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-[#6b7280]">
                      {new Date(s.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        s.read
                          ? "bg-green-50 text-green-700"
                          : "bg-[#111827]/10 text-[#111827]"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          s.read ? "bg-green-500" : "bg-[#111827]"
                        }`} />
                        {s.read ? "Read" : "New"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/dashboard/${s.id}`}
                          className="rounded bg-[#0f172a] px-3 py-1.5 text-[10px] font-semibold text-white transition hover:bg-[#1e293b]"
                        >
                          View
                        </Link>
                        {!s.read && (
                          <button
                            onClick={() => markRead(s.id, true)}
                            className="rounded border border-[#e5e7eb] px-3 py-1.5 text-[10px] font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
