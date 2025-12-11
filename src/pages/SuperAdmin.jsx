import { useState } from 'react';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SuperAdmin.css'; // Add this line

export default function SuperAdmin() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const [admins, setAdmins] = useState([
    { id: 1, username: 'superadmin', role: 'superadmin', createdAt: '2024-01-15', status: 'Active' },
    { id: 2, username: 'admin', role: 'admin', createdAt: '2024-02-20', status: 'Active' },
    { id: 3, username: 'tournament_admin', role: 'admin', createdAt: '2024-03-10', status: 'Active' },
    { id: 4, username: 'event_coordinator', role: 'admin', createdAt: '2024-04-05', status: 'Active' },
  ]);

  const handleAddAdmin = () => {
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (admins.some(a => a.username === username)) {
      toast.error('Username already exists');
      return;
    }

    const newAdmin = {
      id: Date.now(),
      username,
      role,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    setAdmins([...admins, newAdmin]);
    setUsername('');
    setPassword('');
    setRole('admin');
    setShowAddModal(false);
    toast.success('Admin account created successfully');
  };

  const handleDelete = (id, adminUsername) => {
    if (adminUsername === 'superadmin') {
      toast.error('Cannot delete super admin account');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${adminUsername}?`)) {
      setAdmins(admins.filter(a => a.id !== id));
      toast.success('Admin account deleted');
    }
  };

  const toggleStatus = (id) => {
    setAdmins(admins.map(a => 
      a.id === id 
        ? { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' }
        : a
    ));
    toast.success('Status updated');
  };

  return (
    <div className="super-admin-container"> {/* Refactored */}
      <div className="super-admin-header-section"> {/* Refactored */}
        <h1 className="super-admin-title">Super Admin Panel</h1> {/* Refactored */}
        <p className="super-admin-subtitle">Manage administrator accounts and permissions</p> {/* Refactored */}
      </div>

      {/* Stats */}
      <div className="stats-grid"> {/* Refactored */}
        <div className="card stat-card"> {/* Refactored */}
          <div className="stat-card-header"> {/* Refactored */}
            <Shield className="stat-icon" size={24} /> {/* Refactored */}
            <p className="stat-label">Total Admins</p> {/* Refactored */}
          </div>
          <h3 className="stat-value text-blue">{admins.length}</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Active</p> {/* Refactored */}
          <h3 className="stat-value text-blue">{admins.filter(a => a.status === 'Active').length}</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Super Admins</p> {/* Refactored */}
          <h3 className="stat-value text-yellow">{admins.filter(a => a.role === 'superadmin').length}</h3> {/* Refactored */}
        </div>
      </div>

      {/* Action Button */}
      <div className="action-button-container"> {/* Refactored */}
        <button
          onClick={() => setShowAddModal(true)}
          className="action-button primary" 
        >
          <Plus size={20} />
          Create New Admin
        </button>
      </div>

      {/* Permissions Info */}
      <div className="card permissions-info-card"> {/* Refactored */}
        <h3 className="card-title">Admin Permissions</h3> {/* Refactored */}
        <div className="permissions-grid"> {/* Refactored */}
          <div>
            <h4 className="permission-heading">Super Admin Can:</h4> {/* Refactored */}
            <ul className="permission-list"> {/* Refactored */}
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet yellow">●</span> {/* Refactored */}
                <span>Create and delete admin accounts</span>
              </li>
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet yellow">●</span> {/* Refactored */}
                <span>Access all system features</span>
              </li>
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet yellow">●</span> {/* Refactored */}
                <span>Manage all tournaments</span>
              </li>
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet yellow">●</span> {/* Refactored */}
                <span>Full system configuration access</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="permission-heading">Sub-Admin Can:</h4> {/* Refactored */}
            <ul className="permission-list"> {/* Refactored */}
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet blue">●</span> {/* Refactored */}
                <span>Create tournaments</span>
              </li>
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet blue">●</span> {/* Refactored */}
                <span>Edit tournaments</span>
              </li>
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet blue">●</span> {/* Refactored */}
                <span>Manage participants</span>
              </li>
              <li className="permission-list-item"> {/* Refactored */}
                <span className="permission-bullet blue">●</span> {/* Refactored */}
                <span>View eternal table</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Admin List */}
      <div className="card admin-list-card"> {/* Refactored */}
        <div className="card-header"> {/* Refactored */}
          <h3 className="card-title">Admin Accounts</h3> {/* Refactored */}
        </div>

        <div className="overflow-x-auto">
          <table className="full-width-table"> {/* Refactored */}
            <thead>
              <tr className="table-header-row"> {/* Refactored */}
                <th className="table-header-cell">Username</th> {/* Refactored */}
                <th className="table-header-cell">Role</th> {/* Refactored */}
                <th className="table-header-cell">Created Date</th> {/* Refactored */}
                <th className="table-header-cell">Status</th> {/* Refactored */}
                <th className="table-header-cell">Actions</th> {/* Refactored */}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="table-row"> {/* Refactored */}
                  <td className="table-cell">
                    <div className="admin-username-cell"> {/* Refactored */}
                      {admin.role === 'superadmin' && (
                        <Shield className="admin-shield-icon" size={20} /> 
                      )}
                      <span className="admin-username">{admin.username}</span> {/* Refactored */}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`admin-role-badge ${
                      admin.role === 'superadmin' 
                        ? 'superadmin' 
                        : 'admin'
                    }`}>
                      {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="table-cell">{admin.createdAt}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => toggleStatus(admin.id)}
                      disabled={admin.username === 'superadmin'}
                      className={`status-toggle-button ${
                        admin.status === 'Active' 
                          ? 'active'
                          : 'suspended'
                      }`}
                    >
                      {admin.status}
                    </button>
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleDelete(admin.id, admin.username)}
                      disabled={admin.username === 'superadmin'}
                      className="action-button danger icon-only" 
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay" 
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header"> {/* Refactored */}
                <h3 className="modal-title">Create New Admin</h3> {/* Refactored */}
              </div>

              <div className="modal-body"> {/* Refactored */}
                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="form-label">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>

                <div className="info-box info-box-yellow"> {/* Refactored */}
                  <p className="info-box-text"> {/* Refactored */}
                    <strong>Note:</strong> Make sure to save the password securely. 
                    Admins will use these credentials to log in.
                  </p>
                </div>
              </div>

              <div className="modal-footer"> {/* Refactored */}
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setUsername('');
                    setPassword('');
                    setRole('admin');
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  className="action-button primary" 
                >
                  Create Admin
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
