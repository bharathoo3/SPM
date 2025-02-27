import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SlideNavbar.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const msg = location.state?.msg;

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Admin login
      if (msg === "admin") {
        if (email === 'admin@gmail.com' && password === 'admin') {
          console.log('Admin logged in successfully');
          navigate('/admin_dashboard');
          return;
        }
        setError('Invalid email or password');
        return;
      }

      let apiUrl = '';
      if (msg === "teacher") apiUrl = 'http://localhost:5000/api/teachers';
      else if (msg === "student") apiUrl = 'http://localhost:5000/api/students';

      if (!apiUrl) {
        setError('Invalid user type');
        return;
      }

      // Fetch user data from MongoDB backend
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Failed to fetch ${msg} data: ${response.status}`);

      const users = await response.json();
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        navigate(`/${msg}_dashboard/${user._id}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error:', err.message);
      setError('Login failed. Please try again.');
    }
  };
  
  return (
    <div className="body">
      <div className="main">
        <h2 className="label">{msg}'s Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
