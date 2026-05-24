import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";
import { getTasks } from "../services/taskService";

const ProfilePage = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setAuthToken(token);
        const data = await getTasks();
        setTasks(data);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    { label: "Email", value: user?.email || "Not available" },
    { label: "Name", value: user?.name || "Not available" },
    { label: "Total tasks", value: String(tasks.length) },
    { label: "Completed tasks", value: String(tasks.filter((task) => task.status === "done").length) },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">Profile</p>
        <h2 className="mt-2 text-3xl font-semibold">Your Kanvix details</h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          A simple overview of your account and task progress.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <LoadingSkeleton key={index} />)
          : stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="mt-3 text-xl font-semibold">{item.value}</p>
              </div>
            ))}
      </section>

      {!loading && !user ? <EmptyState title="Profile not found." description="Please log in again." /> : null}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white dark:bg-brand-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
