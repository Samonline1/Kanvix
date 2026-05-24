import Task from "../models/Task.js";

export const getTasks = async (req, res, next) => {
  try {
    const query = {
      createdBy: req.user._id,
    };

    if (req.query.projectId) {
      query.projectId = req.query.projectId;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, projectId } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      projectId: projectId || "default-board",
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const { title, description, status, priority, dueDate } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate === "" ? null : dueDate ?? task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
