import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/ManageParticipants.css';


const ParticipantRow = ({ participant, index }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="participant-row"
    >
      <td className="participant-cell seed-cell">
        <span className="seed-badge">
          {index + 1}
        </span>
      </td>
      <td className="participant-cell name-cell">{participant.name}</td>
      <td className="participant-cell email-cell">{participant.email}</td>
      <td className="participant-cell rating-cell">{participant.rating}</td>
      <td className="participant-cell status-cell">
        <span className={`status-badge ${
          participant.status === 'Active'
            ? 'status-active'
            : 'status-inactive'
        }`}>
          {participant.status}
        </span>
      </td>
    </motion.tr>
  );
};

export default function ViewOnlyManageParticipants() {
  const [searchQuery, setSearchQuery] = useState('');

  const [participants, setParticipants] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', rating: 1850, status: 'Active' },
    { id: 2, name: 'Maria Garcia', email: 'maria.g@example.com', rating: 1920, status: 'Active' },
    { id: 3, name: 'James Smith', email: 'james.s@example.com', rating: 1780, status: 'Active' },
    { id: 4, name: 'Emily Chen', email: 'emily.c@example.com', rating: 2010, status: 'Active' },
    { id: 5, name: 'Michael Brown', email: 'michael.b@example.com', rating: 1650, status: 'Active' },
    { id: 6, name: 'Sarah Williams', email: 'sarah.w@example.com', rating: 1890, status: 'Active' },
    { id: 7, name: 'David Martinez', email: 'david.m@example.com', rating: 1720, status: 'Active' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', rating: 1980, status: 'Active' },
    { id: 9, name: 'Robert Taylor', email: 'robert.t@example.com', rating: 1810, status: 'Active' },
    { id: 10, name: 'Jessica Lee', email: 'jessica.l@example.com', rating: 1940, status: 'Active' },
  ]);

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="manage-participants-container">
        <div className="manage-participants-header">
          <h1>Participants</h1>
          <p>View tournament participants</p>
        </div>

        <div className="action-bar">
          <div className="action-bar-content">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                placeholder="Search participants..."
              />
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Participants</p>
            <h3 className="stat-value">{participants.length}</h3>
          </div>
          <div className="stat-card">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{participants.filter(p => p.status === 'Active').length}</h3>
          </div>
          <div className="stat-card">
            <p className="stat-label">Average Rating</p>
            <h3 className="stat-value">
              {participants.length > 0
                ? Math.round(participants.reduce((sum, p) => sum + p.rating, 0) / participants.length)
                : 0}
            </h3>
          </div>
        </div>

        <div className="participants-table-wrapper">
          <div className="participants-table-header">
            <h3>Participants List</h3>
          </div>

          <div className="table-responsive">
            <table className="participants-table">
              <thead>
                <tr>
                  <th className="px-6 py-4">Seed</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant, index) => (
                  <ParticipantRow
                    key={participant.id}
                    participant={participant}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="no-participants-message">
              <p>No participants found</p>
            </div>
          )}
        </div>
      </div>
  );
}
