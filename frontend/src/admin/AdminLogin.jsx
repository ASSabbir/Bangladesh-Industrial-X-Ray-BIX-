import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Demo credentials — matches the defaults in backend/.env.
// If you changed ADMIN_EMAIL / ADMIN_PASSWORD in your own .env before
// seeding, update these two constants to match so the demo button works.
const DEMO_EMAIL = "admin@bixndt.com";
const DEMO_PASSWORD = "ChangeMe123!";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const doLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    doLogin(form.email, form.password);
  };

  const handleDemoLogin = () => {
    setForm({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    doLogin(DEMO_EMAIL, DEMO_PASSWORD);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-accent mb-3">
            BIX
          </div>
          <h1 className="text-xl font-bold text-primary">Admin Login</h1>
          <p className="text-xs text-textmuted mt-1">Bangladesh Industrial X-Ray</p>
        </div>

        {/* One-click demo login */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full mb-4 inline-flex items-center justify-center gap-2 border-2 border-dashed border-accent/40 text-accent font-semibold px-4 py-2.5 rounded-md text-sm hover:bg-accent/5 transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in..." : " Continue with Demo Account"}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[11px] text-textmuted uppercase tracking-wide">or sign in manually</span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@bixndt.com"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-[11px] text-textmuted text-center mt-5">
          Demo credentials: <strong>{DEMO_EMAIL}</strong> / <strong>{DEMO_PASSWORD}</strong>
        </p>
      </div>
    </div>
  );
}