import { useEffect, useState } from "react";

const emptyTask = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

const TaskModal = ({ isOpen, task, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState(emptyTask);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      });
    } else {
      setFormData(emptyTask);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{task ? "Task details" : "Create task"}</h2>
          <button type="button" onClick={onClose} className="text-sm text-slate-500">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              {task ? (
                <button
                  type="button"
                  onClick={onDelete}
                  className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
                >
                  Delete task
                </button>
              ) : null}
            </div>
            <button type="submit" className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-medium text-white">
              Save task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
