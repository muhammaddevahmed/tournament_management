import { useState } from 'react';
import { Search, Eye, Edit, Trash2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/ManageTournaments.css'; // Add this line

export default function ManageTournaments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [tournaments, setTournaments] = useState([
    { 
      id: 1, 
      name: 'Summer Championship 2025', 
      format: 'Multi-Stage', 
      status: 'Active', 
      participants: 176, 
      progress: 65,
      startDate: '2025-06-01',
      endDate: '2025-08-15',
      matches: 342,
      completedMatches: 223
    },
    { 
      id: 2, 
      name: 'Winter League', 
      format: 'League', 
      status: 'Active', 
      participants: 48, 
      progress: 80,
      startDate: '2025-01-10',
      endDate: '2025-03-20',
      matches: 240,
      completedMatches: 192
    },
    { 
      id: 3, 
      name: 'Spring Knockout Cup', 
      format: 'Knockout', 
      status: 'Completed', 
      participants: 32, 
      progress: 100,
      startDate: '2025-03-01',
      endDate: '2025-04-15',
      matches: 31,
      completedMatches: 31
    },
    { 
      id: 4, 
      name: 'Monthly Round Robin', 
      format: 'Round Robin', 
      status: 'Active', 
      participants: 64, 
      progress: 45,
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      matches: 512,
      completedMatches: 230
    },
    { 
      id: 5, 
      name: 'Last Uma Challenge', 
      format: 'Last Uma Standing', 
      status: 'Scheduled', 
      participants: 24, 
      progress: 0,
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      matches: 96,
      completedMatches: 0
    },
    { 
      id: 6, 
      name: 'Autumn League Pro', 
      format: 'League', 
      status: 'Active', 
      participants: 40, 
      progress: 30,
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      matches: 200,
      completedMatches: 60
    },
    { 
      id: 7, 
      name: 'Champions Cup', 
      format: 'Knockout', 
      status: 'Completed', 
      participants: 16, 
      progress: 100,
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      matches: 15,
      completedMatches: 15
    },
    { 
      id: 8, 
      name: 'Regional Qualifiers', 
      format: 'Round Robin', 
      status: 'Active', 
      participants: 96, 
      progress: 55,
      startDate: '2025-04-15',
      endDate: '2025-06-15',
      matches: 720,
      completedMatches: 396
    },
  ]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setTournaments(tournaments.filter(t => t.id !== id));
      toast.success('Tournament deleted');
    }
  };

  const handleExport = (tournament) => {
    toast.success(`Exporting ${tournament.name}...`);
  };

  const filteredTournaments = tournaments.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.format.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tournaments.length,
    active: tournaments.filter(t => t.status === 'Active').length,
    completed: tournaments.filter(t => t.status === 'Completed').length,
    scheduled: tournaments.filter(t => t.status === 'Scheduled').length
  };

  return (
    <div className="manage-tournaments-container"> {/* Refactored */}
      <div className="manage-tournaments-header-section"> {/* Refactored */}
        <h1 className="manage-tournaments-title">Manage Tournaments</h1> {/* Refactored */}
        <p className="manage-tournaments-subtitle">View and manage all tournaments</p> {/* Refactored */}
      </div>

      {/* Stats */}
      <div className="stats-grid"> {/* Refactored */}
        <div className="stat-card"> {/* Refactored */}
          <p className="stat-label">Total Tournaments</p> {/* Refactored */}
          <h3 className="stat-value text-blue">{stats.total}</h3> {/* Refactored, using text-blue to map to var(--blue-800) */}
        </div>
        <div className="stat-card"> {/* Refactored */}
          <p className="stat-label">Active</p> {/* Refactored */}
          <h3 className="stat-value text-blue">{stats.active}</h3> {/* Refactored */}
        </div>
        <div className="stat-card"> {/* Refactored */}
          <p className="stat-label">Completed</p> {/* Refactored */}
          <h3 className="stat-value text-dark">{stats.completed}</h3> {/* Refactored, using text-dark to map to var(--gray-900) */}
        </div>
        <div className="stat-card"> {/* Refactored */}
          <p className="stat-label">Scheduled</p> {/* Refactored */}
          <h3 className="stat-value text-yellow">{stats.scheduled}</h3> {/* Refactored, using text-yellow to map to var(--yellow-400) */}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card search-filter-card"> {/* Refactored */}
        <div className="search-filter-controls"> {/* Refactored */}
          <div className="search-input-wrapper"> {/* Refactored */}
            <Search className="search-icon" size={20} /> {/* Refactored */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input" 
              placeholder="Search tournaments..."
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select filter-select" 
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="tournaments-grid"> {/* Refactored */}
        {filteredTournaments.map((tournament) => (
          <div key={tournament.id} className="tournament-card"> {/* Refactored */}
            <div className="tournament-card-header"> {/* Refactored */}
              <div className="tournament-card-info"> {/* Refactored */}
                <div className="flex-1">
                  <h3 className="tournament-name">{tournament.name}</h3> {/* Refactored */}
                  <div className="tournament-tags"> {/* Refactored */}
                    <span className="tournament-format-badge1"> {/* Refactored */}
                      {tournament.format}
                    </span>
                    <span className={`status-badge ${
                      tournament.status === 'Active' 
                        ? 'status-active'
                        : tournament.status === 'Completed'
                        ? 'status-completed'
                        : 'status-scheduled'
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tournament-details-grid"> {/* Refactored */}
                <div>
                  <p className="tournament-detail-label">Participants</p> {/* Refactored */}
                  <p className="tournament-detail-value">{tournament.participants}</p> {/* Refactored */}
                </div>
                <div>
                  <p className="tournament-detail-label">Matches</p> {/* Refactored */}
                  <p className="tournament-detail-value">{tournament.completedMatches}/{tournament.matches}</p> {/* Refactored */}
                </div>
                <div>
                  <p className="tournament-detail-label">Start Date</p> {/* Refactored */}
                  <p className="tournament-detail-value">{tournament.startDate}</p> {/* Refactored */}
                </div>
                <div>
                  <p className="tournament-detail-label">End Date</p> {/* Refactored */}
                  <p className="tournament-detail-value">{tournament.endDate}</p> {/* Refactored */}
                </div>
              </div>

              <div className="progress-section"> {/* Refactored */}
                <div className="progress-label-container"> {/* Refactored */}
                  <span className="progress-label">Progress</span> {/* Refactored */}
                  <span className="progress-percentage">{tournament.progress}%</span> {/* Refactored */}
                </div>
                <div className="progress-bar-background"> {/* Refactored */}
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${tournament.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="tournament-card-actions"> {/* Refactored */}
              <Link
                to={`/tournament/${tournament.id}`}
                className="action-button primary" 
              >
                <Eye size={16} />
                View
              </Link>
              <button
                onClick={() => handleExport(tournament)}
                className="action-button secondary" 
              >
                <Download size={16} />
                Export
              </button>
              <button
                onClick={() => handleDelete(tournament.id, tournament.name)}
                className="action-button delete" 
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <div className="no-tournaments-message"> {/* Refactored */}
          <p>No tournaments found</p>
        </div>
      )}
    </div>
  );
}
