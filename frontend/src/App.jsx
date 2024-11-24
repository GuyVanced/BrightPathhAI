import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/dashboard/Dashboard';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import PracticeForFree from './pages/features/PracticeForFree';
import RoleBasedRoadmaps from './pages/roadmaps/RoleBasedRoadmaps';
import SkillsBasedRoadmaps from './pages/roadmaps/SkillsBasedRoadmaps';
import BrightPathAI from './BrightPathAI';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<BrightPathAI />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/practice" 
          element={
            <ProtectedRoute>
              <PracticeForFree />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/roadmaps/role-based" 
          element={
            <ProtectedRoute>
              <RoleBasedRoadmaps />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/roadmaps/skills-based" 
          element={
            <ProtectedRoute>
              <SkillsBasedRoadmaps />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
