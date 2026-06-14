"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Mail, Phone, Building2, Globe, Tag } from "lucide-react";

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

export default function SubmissionDetail() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/submissions/${params.id}`);
        if (!res.ok) {
          if (res.status === 401) router.push("/admin");
          throw new Error("Not found");
        }
        const data = await res.json();
        setSubmission(data);

        if (!data.read) {
          await fetch(`/api/submissions/${params.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ read: true }),
          });
          setSubmission({ ...data, read: true });
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#e5e7eb] border-t-[#b8860b]" />
          Loading...
        </div>
      </main>
    );
  }

  if (!submission) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <div className="text-center">
          <p className="text-sm text-[#6b7280]">Submission not found</p>
          <Link href="/admin/dashboard" className="mt-4 inline-block text-sm font-semibold text-[#b8860b] transition hover:text-[#9a7209]">Back to Dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ractysh Global Trade"
            width={100}
            height={28}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6b7280] transition hover:text-[#0f172a]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] text-lg font-bold text-white">
              {submission.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">{submission.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  submission.read
                    ? "bg-green-50 text-green-700"
                    : "bg-[#b8860b]/10 text-[#b8860b]"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    submission.read ? "bg-green-500" : "bg-[#b8860b]"
                  }`} />
                  {submission.read ? "Read" : "New"}
                </span>
                <span className="text-[11px] text-[#9ca3af]">
                  {new Date(submission.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8860b] mb-5">
              <Tag className="h-3.5 w-3.5" />
              Subject
            </h2>
            <p className="text-lg font-semibold text-[#0f172a]">{submission.subject || "General Inquiry"}</p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8860b] mb-5">
              <Mail className="h-3.5 w-3.5" />
              Contact Information
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#9ca3af]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Email</p>
                  <a href={`mailto:${submission.email}`} className="text-sm text-[#b8860b] transition hover:text-[#9a7209]">{submission.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#9ca3af]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Phone</p>
                  <a href={`tel:${submission.phone}`} className="text-sm text-[#0f172a]">{submission.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 text-[#9ca3af]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Company</p>
                  <p className="text-sm text-[#0f172a]">{submission.company || "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 text-[#9ca3af]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Country</p>
                  <p className="text-sm text-[#0f172a]">{submission.country || "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 text-[#9ca3af]" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Submitted</p>
                  <p className="text-sm text-[#0f172a]">{new Date(submission.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {submission.services && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8860b] mb-4">
                <Tag className="h-3.5 w-3.5" />
                Services Interested In
              </h2>
              <div className="flex flex-wrap gap-2">
                {submission.services.split(", ").map((s) => (
                  <span key={s} className="rounded-full bg-[#b8860b]/10 px-3 py-1.5 text-xs font-medium text-[#b8860b]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {submission.message && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8860b] mb-4">
                Message
              </h2>
              <div className="rounded-lg bg-[#f8f7f4] p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#0f172a]">{submission.message}</p>
              </div>
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6b7280] transition hover:text-[#0f172a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all submissions
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
