import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import EmptyState from "../components/EmptyState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";
import { getTasks } from "../services/taskService";
import { projectOptions } from "../utils/constants";

const DashboardPage = () => {
  const { token } = useAuth();
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

  const analytics = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    inprogress: tasks.filter((task) => task.status === "inprogress").length,
    done: tasks.filter((task) => task.status === "done").length,
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard label="Total tasks" value={analytics.total} />
        <AnalyticsCard label="Todo" value={analytics.todo} />
        <AnalyticsCard label="In Progress" value={analytics.inprogress} />
        <AnalyticsCard label="Done" value={analytics.done} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent tasks</h2>
          </div>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => <LoadingSkeleton key={index} />)
            ) : tasks.length ? (
              tasks.slice(0, 3).map((task) => <TaskCard key={task._id} task={task} onClick={() => {}} />)
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="mt-4 space-y-3">
            {projectOptions.map((project) => (
              <Link
                key={project.id}
                to={`/board/${project.id}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
              >
                <span>{project.name}</span>
                <span className="text-sm text-slate-400">Open board</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
