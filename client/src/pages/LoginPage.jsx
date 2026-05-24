import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";
import { loginUser } from "../services/authService";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);
      login(data);
      setAuthToken(data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Welcome back to Kanvix.</p>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-brand-600 px-4 py-3 font-medium text-white disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          No account? <Link to="/register" className="text-brand-600">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
