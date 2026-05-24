import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import BoardPage from "../pages/BoardPage";
import DashboardPage from "../pages/DashboardPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfilePage />} />
      </Route>
      <Route
        path="/board/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BoardPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
