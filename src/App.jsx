import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

import { ProfileProvider } from './ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
