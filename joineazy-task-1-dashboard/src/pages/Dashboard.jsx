import Navbar from "../components/Navbar.jsx";
import RoleSwitcher from "../components/RoleSwitcher.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import StudentDashboard from "../components/StudentDashboard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4">
          <RoleSwitcher />
        </div>
        {user.role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
      </main>
    </div>
  );
}
