import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskService";
import { projectOptions, statusColumns } from "../utils/constants";

const BoardPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const projectName = projectOptions.find((project) => project.id === id)?.name || "Project Board";

  const loadTasks = async () => {
    try {
      setLoading(true);
      setAuthToken(token);
      const data = await getTasks(id);
      setTasks(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [id, token]);

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleOpenTask = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = async (formData) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask._id, formData);
        toast.success("Task updated");
      } else {
        await createTask({ ...formData, projectId: id });
        toast.success("Task created");
      }
      handleCloseModal();
      loadTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save task");
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    try {
      await deleteTask(selectedTask._id);
      toast.success("Task deleted");
      handleCloseModal();
      loadTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Board</p>
          <h2 className="text-2xl font-semibold">{projectName}</h2>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-medium text-white"
        >
          Create task
        </button>
      </div>

      {loading ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, columnIndex) => (
            <div key={columnIndex} className="space-y-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <div className="h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          ))}
        </div>
      ) : tasks.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {statusColumns.map((column) => (
            <div key={column.key} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{column.label}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                  {tasks.filter((task) => task.status === column.key).length}
                </span>
              </div>
              <div className="space-y-4">
                {tasks.filter((task) => task.status === column.key).length ? (
                  tasks
                    .filter((task) => task.status === column.key)
                    .map((task) => <TaskCard key={task._id} task={task} onClick={handleOpenTask} />)
                ) : (
                  <EmptyState title={`No ${column.label.toLowerCase()} tasks yet.`} description="Create your first task." />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <TaskModal
        isOpen={modalOpen}
        task={selectedTask}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default BoardPage;
