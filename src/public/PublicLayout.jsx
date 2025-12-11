import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Trophy, 
  List, 
  Users, 
  Crown, 
  Gamepad2,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import '../styles/Layout.css'; 

export default function PublicLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/manage-tournaments', icon: List, label: 'Tournaments' },
    { path: '/manage-participants', icon: Users, label: 'Participants' },
    { path: '/eternal-table', icon: Crown, label: 'Eternal Table' },
    { path: '/characters', icon: Gamepad2, label: 'Characters' },
  ];

  return (
    <div className="layout-container">
      {/* Sidebar - Desktop */}
      <aside className="sidebar-desktop">
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <Trophy className="sidebar-logo-icon" size={32} />
            <h2 className="sidebar-logo-text">Tournament Pro</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path; 
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`} 
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link to="/login" className="admin-login-button">
            <LogOut size={20} />
            <span>Admin Login</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay ${sidebarOpen ? 'active' : ''}`}>
        <div className="mobile-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        
        <aside className={`mobile-sidebar ${sidebarOpen ? 'active' : ''}`}>
          <div className="mobile-sidebar-header">
            <div className="sidebar-logo-container">
              <Trophy className="sidebar-logo-icon" size={32} />
              <h2 className="sidebar-logo-text">Tournament Pro</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="mobile-sidebar-close-button">
              <X size={24} />
            </button>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <Link to="/login" className="admin-login-button">
              <LogOut size={20} />
              <span>Admin Login</span>
            </Link>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="main-content-wrapper">
        <header className="mobile-header">
          <div className="mobile-header-content">
            <div className="mobile-header-left">
              <button onClick={() => setSidebarOpen(true)} className="mobile-menu-button">
                <Menu size={24} />
              </button>
              <Trophy className="mobile-header-icon" size={24} />
              <h3 className="mobile-header-title">Tournament Pro</h3>
            </div>
          </div>
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}