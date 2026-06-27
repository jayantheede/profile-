import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './ProfileContext';

import PremiumLayout from './components/PremiumLayout';
import HighEndHome from './pages/HighEndHome';
import { 
  Memberships, Certificates, Experience, 
  Publications, PatentsAwards, Grants, Gallery,
  Conferences, Talks, Reports
} from './pages/PremiumPages';

import AcademicProfile from './pages/AcademicProfile';
import Profile from './pages/Profile';
import PremiumProfile from './pages/PremiumProfile';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          {/* New High-End Multi-Page Layout */}
          <Route path="/" element={<PremiumLayout />}>
            <Route index element={<HighEndHome />} />
            <Route path="activities/memberships" element={<Memberships />} />
            <Route path="activities/certificates" element={<Certificates />} />
            <Route path="activities/experience" element={<Experience />} />
            <Route path="activities/reports" element={<Reports />} />
            
            <Route path="research/publications" element={<Publications />} />
            <Route path="research/conferences" element={<Conferences />} />
            <Route path="research/talks" element={<Talks />} />
            <Route path="research/patents" element={<PatentsAwards />} />
            
            <Route path="industry/grants" element={<Grants />} />
            
            <Route path="life/gallery" element={<Gallery />} />
          </Route>

          {/* Legacy & Alternative Routes */}
          <Route path="/academic" element={<AcademicProfile />} />
          <Route path="/modern" element={<Profile />} />
          <Route path="/premium-single" element={<PremiumProfile />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
