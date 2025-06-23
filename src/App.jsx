import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeManagement from "./Pages/EmployeeManagement";
import TaskManagement from "./Pages/Admin/TaskManagement";
import PayrollPage from "./Pages/Admin/PayrollPage";
import EmployeeProfile from "./Pages/EmployeeProfile";
import EmployeePayrollPage from "./Pages/EmployeePayrollPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/employee/payroll" element={<EmployeePayrollPage />} />
        


     
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payroll"
          element={
            <ProtectedRoute role="admin">
              <PayrollPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute role="admin">
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute role="admin">
              <TaskManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="employee">
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
