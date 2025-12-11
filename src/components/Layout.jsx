import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  List, 
  Users, 
  Crown, 
  Gamepad2, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';
import '../styles/Layout.css'; 

export default function Layout({ children, currentUser, onLogout }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // FIX: Added "/admin" prefix to all paths
  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/create-tournament', icon: Trophy, label: 'Create Tournament' },
    { path: '/admin/manage-tournaments', icon: List, label: 'Manage Tournaments' },
    { path: '/admin/manage-participants', icon: Users, label: 'Manage Participants' },
    { path: '/admin/eternal-table', icon: Crown, label: 'Eternal Table' },
    { path: '/admin/characters', icon: Gamepad2, label: 'Characters' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  if (currentUser?.role === 'superadmin') {
    menuItems.splice(6, 0, { path: '/admin/super-admin', icon: Shield, label: 'Super Admin' });
  }

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
            // Check if current location starts with the item path to keep active state correct
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
          <div className="user-info-card">
            <p className="user-info-username">{currentUser?.username}</p>
            <p className="user-info-role">{currentUser?.role === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
          </div>
          
          <button onClick={onLogout} className="logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="mobile-sidebar-overlay">
          <div className="mobile-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
          
          <aside className="mobile-sidebar">
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
              <div className="user-info-card">
                <p className="user-info-username">{currentUser?.username}</p>
                <p className="user-info-role">{currentUser?.role === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
              </div>
              
              <button onClick={onLogout} className="logout-button">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

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