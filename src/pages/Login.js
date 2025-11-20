import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, users }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!users[formData.email]) {
      setError('User not found');
      return;
    }
    
    if (users[formData.email].password !== formData.password) {
      setError('Invalid password');
      return;
    }

    onLogin(formData.email, users[formData.email]);
    navigate('/');
  };

  return (
    <div className="page-content">
      <div className="auth-container">
        <h1>Login</h1>
        <div className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="btn btn-primary btn-full" onClick={handleSubmit}>
            Login
          </button>
          <p className="auth-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;