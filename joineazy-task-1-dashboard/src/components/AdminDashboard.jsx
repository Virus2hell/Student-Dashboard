// src/components/AdminDashboard.jsx
import AssignmentForm from "./AssignmentForm.jsx";
import AssignmentCard from "./AssignmentCard.jsx";
import { storage } from "../lib/storage.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  if (user?.role !== "admin") return null;

  const [assignments, setAssignments] = useState(() =>
    (storage.get("assignments") || []).filter((a) => a.createdBy === user.id)
  );

  // In case other tabs update localStorage, keep in sync on focus
  useEffect(() => {
    const onFocus = () => {
      const all = storage.get("assignments") || [];
      setAssignments(all.filter((a) => a.createdBy === user.id));
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [user.id]);

  const handleCreated = (newAssignment) => {
    // Prepend to this admin's list
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  return (
    <div className="space-y-4">
      <AssignmentForm onCreated={handleCreated} />
      <div className="space-y-3">
        {assignments.length === 0 ? (
          <div className="card p-6 text-center text-sm text-gray-600">
            No assignments yet. Create your first one above.
          </div>
        ) : (
          assignments.map((a) => <AssignmentCard key={a.id} a={a} mode="admin" />)
        )}
      </div>
    </div>
  );
}
