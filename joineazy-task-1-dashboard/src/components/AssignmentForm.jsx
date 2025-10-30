import { useState } from "react";
import { storage, uid } from "../lib/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AssignmentForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", driveLink: "" });
  const [saving, setSaving] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    const assignments = storage.get("assignments") || [];
    const next = [
      {
        id: uid(),
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate,
        driveLink: form.driveLink.trim(),
        createdBy: user.id,
        createdAt: new Date().toISOString()
      },
      ...assignments
    ];
    storage.set("assignments", next);

    // create submission rows for all students as not_submitted
    const users = storage.get("users") || [];
    const students = users.filter(u => u.role === "student");
    const subs = storage.get("submissions") || [];
    const newSubs = students.map(st => ({
      id: uid(),
      assignmentId: next[0].id,
      studentId: st.id,
      status: "not_submitted"
    }));
    storage.set("submissions", [...newSubs, ...subs]);

    setSaving(false);
    setForm({ title: "", description: "", dueDate: "", driveLink: "" });
    location.reload();
  };

  return (
    <form onSubmit={onSubmit} className="card p-4">
      <h3 className="mb-3 text-lg font-semibold">Create assignment</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Title</label>
          <input className="input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea className="input min-h-24" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className="label">Due date</label>
          <input type="date" className="input" required value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        </div>
        <div>
          <label className="label">Drive link</label>
          <input type="url" className="input" required value={form.driveLink} onChange={(e) => setForm({ ...form, driveLink: e.target.value })} />
        </div>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Create"}</button>
      </div>
    </form>
  );
}
