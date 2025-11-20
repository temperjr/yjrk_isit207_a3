// ==================== App.js ====================
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pets from './pages/Pets';
import Account from './pages/Account';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ReleaseModal from './components/ReleaseModal';
import ScrollToTop from './components/ScrollToTop';
import Gallery from './pages/Gallery';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({
    'user1@gmail.com':{
      name :'user1',
      password: '123',
      adoptionRequests: [],
      releaseRequests: []
    }
  });
  const [showReleaseModal, setShowReleaseModal] = useState(false);

  const handleLogin = (email, userData) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, ...userData });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSignUp = (email, name, password) => {
    setUsers(prev => ({
      ...prev,
      [email]: {
        name,
        password,
        adoptionRequests: [],
        releaseRequests: []
      }
    }));
  };

  const handleReleaseClick = () => {
    setShowReleaseModal(true);
  };

  const addAdoptionRequest = (formData) => {
    if (currentUser) {
      // If user is logged in, save to their account
      setUsers(prev => ({
        ...prev,
        [currentUser.email]: {
          ...prev[currentUser.email],
          adoptionRequests: [
            ...prev[currentUser.email].adoptionRequests,
            { ...formData, date: new Date().toISOString() }
          ]
        }
      }));
      setCurrentUser(prev => ({
        ...prev,
        adoptionRequests: [
          ...prev.adoptionRequests,
          { ...formData, date: new Date().toISOString() }
        ]
      }));
    }
    // If not logged in, form is just submitted (could be sent to admin email in real app)
  };

  const addReleaseRequest = (formData) => {
    if (currentUser) {
      // If user is logged in, save to their account
      setUsers(prev => ({
        ...prev,
        [currentUser.email]: {
          ...prev[currentUser.email],
          releaseRequests: [
            ...prev[currentUser.email].releaseRequests,
            { ...formData, date: new Date().toISOString() }
          ]
        }
      }));
      setCurrentUser(prev => ({
        ...prev,
        releaseRequests: [
          ...prev.releaseRequests,
          { ...formData, date: new Date().toISOString() }
        ]
      }));
    }
    // If not logged in, form is just submitted (could be sent to admin email in real app)
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-wrapper">
        <ScrollToTop />
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout}
          onReleaseClick={handleReleaseClick}
        />
        <div className="container">
          <Routes>
            <Route path="/" element={
              <Home onReleaseClick={handleReleaseClick} />
            } />
            <Route path="/pets" element={
              <Pets 
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onAdopt={addAdoptionRequest}
              />
            } />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/account" element={
              <Account 
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            } />
            <Route path="/login" element={
              <Login 
                onLogin={handleLogin}
                users={users}
              />
            } />
            <Route path="/signup" element={
              <SignUp onSignUp={handleSignUp} />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer onReleaseClick={handleReleaseClick}/>
      </div>

      {/* Global Release Modal */}
      <ReleaseModal
        isOpen={showReleaseModal}
        onClose={() => setShowReleaseModal(false)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onRelease={addReleaseRequest}
      />
    </Router>
  );
};

export default App;