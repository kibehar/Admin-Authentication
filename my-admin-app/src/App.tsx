import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminCode from './pages/AdminCode';
import AdminSignup from './pages/AdminSignup';
import UserLogin from './pages/UserLogin';
import ResetPassword from './pages/ResetPassword';
import AdminLayout from './components/AdminLayout';
import User from './pages/admin/User';
import UserDashboard from './pages/UserDashboard';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route path="users" element={<User />} />
        </Route>
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;