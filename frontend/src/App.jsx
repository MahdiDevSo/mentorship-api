// import { useQuery } from "@tanstack/react-query";
// import { Task } from "./Task";
import { Navigate, Route, Routes } from "react-router";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Admin from "./pages/dashboard/Admin";
import {AdminProtectedRoute} from "./components/auth/AdminProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* TODO:  add protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin /> 
            </AdminProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
