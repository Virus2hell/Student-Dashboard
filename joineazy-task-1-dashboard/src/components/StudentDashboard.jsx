import AssignmentCard from "./AssignmentCard.jsx";
import { storage } from "../lib/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function StudentDashboard() {
  const { user } = useAuth();
  const assignments = storage.get("assignments") || [];
  const subs = storage.get("submissions") || [];

  const my = assignments
    .filter(a => subs.some(s => s.assignmentId === a.id && s.studentId === user.id))
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="space-y-3">
      {my.length === 0 ? (
        <div className="card p-6 text-center text-sm text-gray-600">No assignments assigned to you yet.</div>
      ) : (
        my.map(a => <AssignmentCard key={a.id} a={a} mode="student" />)
      )}
    </div>
  );
}
