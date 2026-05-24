import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "SprintFlow API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err, _req, res, _next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Server error",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
