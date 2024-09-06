import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Repertoire from './pages/Repertoire'; // Assurez-vous que ce fichier existe
import Settings from './pages/Settings';     // Assurez-vous que ce fichier existe
import ErrorPage from './pages/ErrorPage';   // Assurez-vous que ce fichier existe
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState('path/to/default/picture.jpg'); // Image par défaut

  const handleProfilePictureChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Routes sans Navbar et Sidebar */}
        <Route path="/sign-in" element={<SignIn onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Routes protégées avec Navbar et Sidebar */}
        {isAuthenticated ? (
          <>
            <Route
              path="/dashboard/*"
              element={
                <>
                  <Navbar profilePicture={profilePicture} onLogout={handleLogout} />
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="repertoire" element={<Repertoire />} />
                    <Route path="settings" element={<Settings onProfilePictureChange={handleProfilePictureChange} />} />
                    <Route path="error" element={<ErrorPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
