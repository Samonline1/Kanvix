import { formatDate } from "../utils/formatDate";

const priorityClasses = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
};

const TaskCard = ({ task, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(task)}
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{task.title}</h3>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityClasses[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{task.description || "No description"}</p>
      <p className="mt-4 text-xs text-slate-400">Due: {formatDate(task.dueDate)}</p>
    </button>
  );
};

export default TaskCard;
