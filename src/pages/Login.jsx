import { useState } from 'react';
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
    <div className="login-container"> {/* Refactored */}
      <div className="login-wrapper"> {/* Refactored */}
        <div className="text-center mb-8">
          <div className="logo-container"> {/* Refactored */}
            <div className="logo-background"> {/* Refactored */}
              <Trophy className="logo-icon" size={48} /> {/* Refactored */}
            </div>
          </div>
          <h1 className="main-title">Tournament Management System</h1> {/* Refactored */}
          <p className="subtitle">Admin Login</p> {/* Refactored */}
        </div>

        <div className="login-card"> {/* Refactored */}
          <form onSubmit={handleSubmit}>
            <div className="form-group"> {/* Refactored */}
              <label className="form-label">Username</label>
              <div className="input-with-icon"> {/* Refactored */}
                <User className="input-icon" size={20} /> {/* Refactored */}
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="form-group"> {/* Refactored */}
              <label className="form-label">Password</label>
              <div className="input-with-icon"> {/* Refactored */}
                <Lock className="input-icon" size={20} /> {/* Refactored */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button" 
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="demo-credentials"> {/* Refactored */}
            <p className="demo-credentials-title">Demo Credentials:</p> {/* Refactored */}
            <p className="demo-credential-item">Super Admin: superadmin / super123</p> {/* Refactored */}
            <p className="demo-credential-item">Admin: admin / admin123</p> {/* Refactored */}
          </div>
        </div>
      </div>
    </div>
  );
}
