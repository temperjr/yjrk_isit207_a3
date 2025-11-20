// ==================== components/Navbar.js ====================
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout, onReleaseClick }) => {
  const navigate = useNavigate();
  const handleReleaseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onReleaseClick();
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    navigate('/home');
  }

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={handleLogoClick}>
        <span className="paw-icon">🐾</span>
        <h2>Pet Heaven</h2>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pets">Adopt</Link></li>
        <li>
          <button onClick={handleReleaseClick} className="nav-link-button">
            Release
          </button>
        </li>
        <li>
          <Link to='/gallery'>Gallery</Link>
        </li>
        {/* <li><Link to="/about">About</Link></li> */}
        {isLoggedIn && <li><Link to="/account">My Account</Link></li>}
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {!isLoggedIn && <li><Link to="/signup">Sign Up</Link></li>}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;