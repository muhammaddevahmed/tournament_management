import { useState } from 'react';
import { Search, Plus, Upload, Trash2, GripVertical, Download } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/ManageParticipants.css';


const ParticipantRow = ({ participant, index, moveParticipant, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'participant',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, drop] = useDrop({
    accept: 'participant',
    hover: (item) => {
      if (item.index !== index) {
        moveParticipant(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <motion.tr
      ref={(node) => drag(drop(node))}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      className="participant-row" 
    >
      <td className="participant-cell drag-handle">
        <GripVertical className="drag-icon" size={20} />
      </td>
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
      <td className="participant-cell actions-cell">
        <button
          onClick={() => onDelete(participant.id)}
          className="action-button delete" 
        >
          <Trash2 size={18} />
        </button>
      </td>
    </motion.tr>
  );
};

export default function ManageParticipants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '', rating: '' });
  const [bulkData, setBulkData] = useState('');

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

  const moveParticipant = (fromIndex, toIndex) => {
    const updatedParticipants = [...participants];
    const [movedItem] = updatedParticipants.splice(fromIndex, 1);
    updatedParticipants.splice(toIndex, 0, movedItem);
    setParticipants(updatedParticipants);
  };

  const handleAddParticipant = () => {
    if (!newParticipant.name || !newParticipant.email) {
      toast.error('Please fill in required fields');
      return;
    }

    const participant = {
      id: Date.now(),
      name: newParticipant.name,
      email: newParticipant.email,
      rating: parseInt(newParticipant.rating) || 1500,
      status: 'Active'
    };

    setParticipants([...participants, participant]);
    setNewParticipant({ name: '', email: '', rating: '' });
    setShowAddModal(false);
    toast.success('Participant added successfully');
  };

  const handleBulkImport = () => {
    const lines = bulkData.trim().split('\n');
    const newParticipants = [];

    lines.forEach(line => {
      const [name, email, rating] = line.split(',').map(s => s.trim());
      if (name && email) {
        newParticipants.push({
          id: Date.now() + Math.random(),
          name,
          email,
          rating: parseInt(rating) || 1500,
          status: 'Active'
        });
      }
    });

    if (newParticipants.length > 0) {
      setParticipants([...participants, ...newParticipants]);
      setBulkData('');
      setShowBulkModal(false);
      toast.success(`${newParticipants.length} participants imported`);
    } else {
      toast.error('No valid data found');
    }
  };

  const handleDeleteParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
    toast.success('Participant removed');
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all participants?')) {
      setParticipants([]);
      toast.success('All participants deleted');
    }
  };

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportParticipants = () => {
    const csv = 'Name,Email,Rating,Status\n' + 
      participants.map(p => `${p.name},${p.email},${p.rating},${p.status}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'participants.csv';
    a.click();
    toast.success('Participants exported');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="manage-participants-container">
        <div className="manage-participants-header">
          <h1>Manage Participants</h1>
          <p>Add, organize, and manage tournament participants</p>
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

            <div className="action-buttons-group">
              <button
                onClick={() => setShowAddModal(true)}
                className="action-button primary" 
              >
                <Plus size={20} />
                Add Participant
              </button>
              <button
                onClick={() => setShowBulkModal(true)}
                className="action-button yellow"
              >
                <Upload size={20} />
                Bulk Import
              </button>
              <button
                onClick={exportParticipants}
                className="action-button outline-blue"
              >
                <Download size={20} />
                Export
              </button>
              <button
                onClick={handleDeleteAll}
                className="action-button outline-red"
              >
                <Trash2 size={20} />
                Delete All
              </button>
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
            <p>Drag rows to reorder seeding</p>
          </div>

          <div className="table-responsive">
            <table className="participants-table">
              <thead>
                <tr>
                  <th className="px-6 py-4"></th>
                  <th className="px-6 py-4">Seed</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant, index) => (
                  <ParticipantRow
                    key={participant.id}
                    participant={participant}
                    index={index}
                    moveParticipant={moveParticipant}
                    onDelete={handleDeleteParticipant}
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

        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Add Participant</h3>
              </div>

              <div className="modal-body">
                <div>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="form-label">Rating (Optional)</label>
                  <input
                    type="number"
                    value={newParticipant.rating}
                    onChange={(e) => setNewParticipant({ ...newParticipant, rating: e.target.value })}
                    className="form-input"
                    placeholder="1500"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddParticipant}
                  className="action-button primary"
                >
                  Add Participant
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showBulkModal && (
          <div className="modal-overlay" onClick={() => setShowBulkModal(false)}>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="modal-content large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Bulk Import Participants</h3>
                <p>Enter one participant per line: Name, Email, Rating</p>
              </div>

              <div className="modal-body">
                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  className="form-textarea"
                  rows="10"
                  placeholder={'John Doe, john@example.com, 1850\nJane Smith, jane@example.com, 1920\nBob Johnson, bob@example.com, 1780'}
                />
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkImport}
                  className="action-button primary"
                >
                  Import
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
