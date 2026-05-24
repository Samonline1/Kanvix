import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";
import { registerUser } from "../services/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

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
      const data = await registerUser(formData);
      login(data);
      setAuthToken(data.token);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Build a clean task workflow with Kanvix.</p>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            required
          />
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
          {loading ? "Creating..." : "Sign up"}
        </button>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="text-brand-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
