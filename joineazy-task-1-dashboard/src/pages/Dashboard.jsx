import Navbar from "../components/Navbar.jsx";
// import RoleSwitcher from "../components/RoleSwitcher.jsx"; // disabled for production
import AdminDashboard from "../components/AdminDashboard.jsx";
import StudentDashboard from "../components/StudentDashboard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* In development you can temporarily enable the switcher:
            {import.meta.env.MODE === 'development' && <div className="mb-4"><RoleSwitcher /></div>} */}
        {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
      </main>
    </div>
  );
}
