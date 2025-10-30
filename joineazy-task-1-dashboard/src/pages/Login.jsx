import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      setErr("");
      login(email);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-xl font-semibold">Sign in</h1>
        <p className="mb-4 text-sm text-gray-600">
          Use demo emails: admin@uni.edu, s1@uni.edu, s2@uni.edu
        </p>
        <label className="label">Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@uni.edu"
          autoFocus
        />
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        <button className="btn btn-primary mt-4 w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
