"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Work {
  id: string;
  title: string;
  country: string;
  industry: string;
  scope: string;
  result: string;
  image: string;
  published: boolean;
  order: number;
  createdAt: string;
}

const emptyForm = {
  title: "",
  country: "",
  industry: "",
  scope: "",
  result: "",
  image: "",
};

export default function WorksManager() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const router = useRouter();

  const fetchWorks = useCallback(async () => {
    const res = await fetch("/api/works");
    return await res.json() as Work[];
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchWorks();
        if (!cancelled) setWorks(data);
      } catch {
        // silent
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [fetchWorks]);

  const refresh = async () => {
    try {
      const data = await fetchWorks();
      setWorks(data);
    } catch {
      // silent
    }
  };

  const openCreate = () => {
    setForm(emptyForm);
    setPreview("");
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (w: Work) => {
    setForm({
      title: w.title,
      country: w.country,
      industry: w.industry,
      scope: w.scope,
      result: w.result,
      image: w.image,
    });
    setPreview(w.image);
    setEditing(w.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.country || !form.industry || !form.scope || !form.result || !form.image) {
      alert("All fields are required");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/works/${editing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/works", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      refresh();
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (w: Work) => {
    await fetch(`/api/works/${w.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !w.published }),
    });
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this work item?")) return;
    await fetch(`/api/works/${id}`, { method: "DELETE" });
    refresh();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="rounded border border-[#e5e7eb] px-3 py-1.5 text-[10px] font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
          >
            &larr; Back
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#0f172a]">Works Manager</h1>
            <p className="text-xs text-[#6b7280]">Manage portfolio / works items</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreate}
            className="rounded bg-[#b8860b] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#9a7209]"
          >
            + Add Work
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {showForm && (
          <div className="mb-8 rounded-xl border border-[#e5e7eb] bg-white p-6">
            <h2 className="mb-4 text-base font-bold text-[#0f172a]">
              {editing ? "Edit Work" : "Add New Work"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#b8860b]" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Country</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#b8860b]" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Industry</label>
                <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#b8860b]" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Scope</label>
                <input value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })}
                  className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#b8860b]" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Result</label>
                <input value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })}
                  className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#b8860b]" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Image URL</label>
                <input value={form.image} onChange={(e) => { setForm({ ...form, image: e.target.value }); setPreview(e.target.value); }}
                  className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#b8860b]" />
              </div>
            </div>
            {preview && (
              <div className="mt-3">
                <img src={preview} alt="Preview" className="h-24 w-32 rounded object-cover border border-[#e5e7eb]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
            <div className="mt-4 flex gap-3">
              <button onClick={handleSave} disabled={saving}
                className="rounded bg-[#0f172a] px-6 py-2 text-xs font-bold text-white transition hover:bg-[#1e293b] disabled:opacity-50">
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="rounded border border-[#e5e7eb] px-6 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]">
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-sm text-[#6b7280]">Loading...</div>
        ) : works.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#6b7280]">
            No works yet. Click &quot;Add Work&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e5e7eb] bg-[#f8f7f4]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Image</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Title</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Country</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Industry</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Scope</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Result</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Status</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {works.map((w) => (
                  <tr key={w.id} className="border-b border-[#e5e7eb] last:border-0 hover:bg-[#f8f7f4]">
                    <td className="px-4 py-3">
                      <img src={w.image} alt="" className="h-10 w-14 rounded object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </td>
                    <td className="px-4 py-3 font-medium text-[#0f172a]">{w.title}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{w.country}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{w.industry}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{w.scope}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{w.result}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => togglePublished(w)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          w.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                        {w.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(w)}
                          className="rounded bg-[#0f172a] px-3 py-1.5 text-[10px] font-semibold text-white transition hover:bg-[#1e293b]">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(w.id)}
                          className="rounded border border-red-200 px-3 py-1.5 text-[10px] font-semibold text-red-600 transition hover:bg-red-50">
                          Delete
                        </button>
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
