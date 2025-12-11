import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import ViewOnlyTournamentView from './ViewOnlyTournamentView';
import '../styles/ManageTournaments.css';

export default function ViewOnlyManageTournaments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTournament, setSelectedTournament] = useState(null);

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

  const handleTournamentClick = (tournament) => {
    setSelectedTournament(tournament);
  };

  const handleBack = () => {
    setSelectedTournament(null);
  };

  if (selectedTournament) {
    return <ViewOnlyTournamentView tournament={selectedTournament} onBack={handleBack} />;
  }

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
    <div className="manage-tournaments-container">
      <div className="manage-tournaments-header-section">
        <h1 className="manage-tournaments-title">Tournaments</h1>
        <p className="manage-tournaments-subtitle">View all tournaments</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Tournaments</p>
          <h3 className="stat-value text-blue">{stats.total}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active</p>
          <h3 className="stat-value text-blue">{stats.active}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Completed</p>
          <h3 className="stat-value text-dark">{stats.completed}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Scheduled</p>
          <h3 className="stat-value text-yellow">{stats.scheduled}</h3>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card search-filter-card">
        <div className="search-filter-controls">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
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
      <div className="tournaments-grid">
        {filteredTournaments.map((tournament) => (
          <div key={tournament.id} className="tournament-card">
            <div className="tournament-card-header">
              <div className="tournament-card-info">
                <div className="flex-1">
                  <h3 className="tournament-name">{tournament.name}</h3>
                  <div className="tournament-tags">
                    <span className="tournament-format-badge1">
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

              <div className="tournament-details-grid">
                <div>
                  <p className="tournament-detail-label">Participants</p>
                  <p className="tournament-detail-value">{tournament.participants}</p>
                </div>
                <div>
                  <p className="tournament-detail-label">Matches</p>
                  <p className="tournament-detail-value">{tournament.completedMatches}/{tournament.matches}</p>
                </div>
                <div>
                  <p className="tournament-detail-label">Start Date</p>
                  <p className="tournament-detail-value">{tournament.startDate}</p>
                </div>
                <div>
                  <p className="tournament-detail-label">End Date</p>
                  <p className="tournament-detail-value">{tournament.endDate}</p>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-label-container">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percentage">{tournament.progress}%</span>
                </div>
                <div className="progress-bar-background">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${tournament.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="tournament-card-actions">
              <button
                onClick={() => handleTournamentClick(tournament)}
                className="action-button primary"
              >
                <Eye size={16} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <div className="no-tournaments-message">
          <p>No tournaments found</p>
        </div>
      )}
    </div>
  );
}