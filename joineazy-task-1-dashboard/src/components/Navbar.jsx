import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-brand-600"></div>
          <span className="text-lg font-semibold">Assignment Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-600 sm:inline">{user?.name} • {user?.role}</span>
          <button className="btn btn-outline" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
