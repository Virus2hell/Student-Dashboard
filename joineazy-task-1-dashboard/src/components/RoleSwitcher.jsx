import { useAuth } from "../context/AuthContext.jsx";
import { storage } from "../lib/storage.js";

export default function RoleSwitcher() {
  const { user, logout } = useAuth();
  const users = storage.get("users") || [];

  const switchTo = (email) => {
    localStorage.setItem("je.currentUser", JSON.stringify(users.find(u => u.email === email)));
    location.reload();
  };

  return (
    <div className="card p-3">
      <div className="mb-2 text-sm font-medium text-gray-700">Quick switch</div>
      <div className="flex flex-wrap gap-2">
        {users.map(u => (
          <button key={u.id} className={`btn ${u.email === user.email ? "btn-outline" : "btn-primary"}`} onClick={() => switchTo(u.email)}>
            {u.name.split(" ")[0]} ({u.role})
          </button>
        ))}
      </div>
    </div>
  );
}
