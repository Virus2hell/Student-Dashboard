import { format } from "date-fns";
import ProgressBar from "./ProgressBar.jsx";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { storage, uid } from "../lib/storage.js";
import { useAuth } from "../context/AuthContext.jsx";
import clsx from "clsx";

export default function AssignmentCard({ a, mode }) {
  const { user } = useAuth();
  const [dialog, setDialog] = useState({ open: false, step: 1 });

  const subs = storage.get("submissions") || [];
  const users = storage.get("users") || [];

  const allForA = subs.filter(s => s.assignmentId === a.id);
  const mySub = subs.find(s => s.assignmentId === a.id && s.studentId === user.id);

  const submittedCount = allForA.filter(s => s.status === "submitted").length;
  const totalCount = allForA.length || users.filter(u => u.role === "student").length;
  const progress = Math.round((submittedCount / totalCount) * 100);

  const handleConfirm = () => {
    const next = subs.slice();
    const idx = next.findIndex(s => s.assignmentId === a.id && s.studentId === user.id);
    const payload = { id: uid(), assignmentId: a.id, studentId: user.id, status: "submitted", submittedAt: new Date().toISOString() };
    if (idx >= 0) next[idx] = { ...next[idx], ...payload };
    else next.push(payload);
    storage.set("submissions", next);
    setDialog({ open: false, step: 1 });
    location.reload();
  };

  return (
    <div className="card p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{a.title}</h3>
          <p className="text-sm text-gray-600">{a.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>Due: {format(new Date(a.dueDate), "PP")}</span>
            <span>•</span>
            <a href={a.driveLink} target="_blank" className="text-brand-600 underline">Drive link</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mode === "student" && (
            <span className={clsx("badge", mySub?.status === "submitted" ? "badge-green" : "badge-amber")}>
              {mySub?.status === "submitted" ? "Submitted" : "Not submitted"}
            </span>
          )}
          {mode === "admin" && (
            <span className="badge badge-slate">{submittedCount}/{totalCount} submitted</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar value={mode === "admin" ? progress : mySub?.status === "submitted" ? 100 : 0} />
      </div>

      {mode === "student" && (
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" disabled={mySub?.status === "submitted"} onClick={() => setDialog({ open: true, step: 1 })}>
            Mark as Submitted
          </button>
          <a className="btn btn-outline" href={a.driveLink} target="_blank">Open Drive</a>
        </div>
      )}

      <ConfirmDialog
        open={dialog.open}
        step={dialog.step}
        onCancel={() => setDialog({ open: false, step: 1 })}
        onNext={() => setDialog({ open: true, step: 2 })}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
