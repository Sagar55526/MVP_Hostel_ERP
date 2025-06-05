// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Floors from "../pages/Floors";
import Rooms from "../pages/Rooms";
import Beds from "../pages/Beds";
import FeeTracking from "../pages/FeeTracking";
import BiometricLogs from "../pages/BiometricLogs";
import RegisterStudent from "../pages/RegisterStudent";
import StudentProfile from "../pages/StudentProfile";

const AppRoutes = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/floors" element={<Floors />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/fees" element={<FeeTracking />} />
        <Route path="/biometric-logs" element={<BiometricLogs />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </MainLayout>
  </Router>
);

export default AppRoutes;
