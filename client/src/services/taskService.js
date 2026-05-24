import api from "./api";

export const getTasks = async (projectId) => {
  const path = projectId ? `/tasks?projectId=${projectId}` : "/tasks";
  const { data } = await api.get(path);
  return data;
};

export const createTask = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await api.put(`/tasks/${taskId}`, payload);
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await api.delete(`/tasks/${taskId}`);
  return data;
};
