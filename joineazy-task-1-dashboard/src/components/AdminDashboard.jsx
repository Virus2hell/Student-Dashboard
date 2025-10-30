import AssignmentForm from "./AssignmentForm.jsx";
import AssignmentCard from "./AssignmentCard.jsx";
import { storage } from "../lib/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user } = useAuth();
  const assignments = (storage.get("assignments") || []).filter(a => a.createdBy === user.id);

  return (
    <div className="space-y-4">
      <AssignmentForm />
      <div className="space-y-3">
        {assignments.length === 0 ? (
          <div className="card p-6 text-center text-sm text-gray-600">No assignments yet. Create your first one above.</div>
        ) : (
          assignments.map(a => <AssignmentCard key={a.id} a={a} mode="admin" />)
        )}
      </div>
    </div>
  );
}
