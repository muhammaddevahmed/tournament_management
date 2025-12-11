import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/Login.css'; // Add this line

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock users for demo
  const mockUsers = [
    { username: 'superadmin', password: 'super123', role: 'superadmin' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        toast.success('Login successful!');
        onLogin(user);
      } else {
        toast.error('Invalid credentials');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="text-center mb-8">
          <div className="logo-container">
            <div className="logo-background">
              <Trophy className="logo-icon" size={48} />
            </div>
          </div>
          <h1 className="main-title">Tournament Management System</h1>
          <p className="subtitle">Admin Login</p>
        </div>

        <div className="text-center mb-4">
          <p className="admin-only-message"><b>This page is for admins only.</b></p>
          <Link to="/" className="user-dashboard-button">Go to User Dashboard</Link>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button" 
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-credentials-title">Demo Credentials:</p>
            <p className="demo-credential-item">Super Admin: superadmin / super123</p>
            <p className="demo-credential-item">Admin: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
