import { useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import '../styles/TournamentView.css';

export default function ViewOnlyTournamentView({ tournament, onBack }) {
  const [activeTab, setActiveTab] = useState('standings');

  // Mock standings data
  const [standings, setStandings] = useState([
    { id: 1, group: 'Group A', player: 'Alex Johnson', played: 3, wins: 3, draws: 0, losses: 0, goalsFor: 12, goalsAgainst: 3, goalDiff: 9, points: 9 },
    { id: 2, group: 'Group A', player: 'Maria Garcia', played: 3, wins: 2, draws: 0, losses: 1, goalsFor: 8, goalsAgainst: 5, goalDiff: 3, points: 6 },
    { id: 3, group: 'Group A', player: 'James Smith', played: 3, wins: 1, draws: 0, losses: 2, goalsFor: 6, goalsAgainst: 8, goalDiff: -2, points: 3 },
    { id: 4, group: 'Group A', player: 'Emily Chen', played: 3, wins: 0, draws: 0, losses: 3, goalsFor: 2, goalsAgainst: 12, goalDiff: -10, points: 0 },
    { id: 5, group: 'Group B', player: 'Michael Brown', played: 3, wins: 2, draws: 1, losses: 0, goalsFor: 10, goalsAgainst: 4, goalDiff: 6, points: 7 },
    { id: 6, group: 'Group B', player: 'Sarah Williams', played: 3, wins: 2, draws: 1, losses: 0, goalsFor: 9, goalsAgainst: 5, goalDiff: 4, points: 7 },
    { id: 7, group: 'Group B', player: 'David Martinez', played: 3, wins: 1, draws: 0, losses: 2, goalsFor: 7, goalsAgainst: 8, goalDiff: -1, points: 3 },
    { id: 8, group: 'Group B', player: 'Lisa Anderson', played: 3, wins: 0, draws: 0, losses: 3, goalsFor: 3, goalsAgainst: 12, goalDiff: -9, points: 0 },
  ]);

  // Mock matches data
  const [matches, setMatches] = useState([
    { id: 1, round: 'Round 1', group: 'Group A', player1: 'Alex Johnson', player2: 'Emily Chen', score1: 4, score2: 1, date: '2025-06-01', time: '14:00', status: 'Completed' },
    { id: 2, round: 'Round 1', group: 'Group A', player1: 'Maria Garcia', player2: 'James Smith', score1: 3, score2: 2, date: '2025-06-01', time: '15:00', status: 'Completed' },
    { id: 3, round: 'Round 1', group: 'Group B', player1: 'Michael Brown', player2: 'Lisa Anderson', score1: 4, score2: 0, date: '2025-06-01', time: '16:00', status: 'Completed' },
    { id: 4, round: 'Round 1', group: 'Group B', player1: 'Sarah Williams', player2: 'David Martinez', score1: 3, score2: 1, date: '2025-06-01', time: '17:00', status: 'Completed' },
    { id: 5, round: 'Round 2', group: 'Group A', player1: 'Alex Johnson', player2: 'James Smith', score1: 5, score2: 1, date: '2025-06-08', time: '14:00', status: 'Completed' },
    { id: 6, round: 'Round 2', group: 'Group A', player1: 'Maria Garcia', player2: 'Emily Chen', score1: 2, score2: 0, date: '2025-06-08', time: '15:00', status: 'Completed' },
    { id: 7, round: 'Round 2', group: 'Group B', player1: 'Michael Brown', player2: 'David Martinez', score1: 2, score2: 2, date: '2025-06-08', time: '16:00', status: 'Completed' },
    { id: 8, round: 'Round 2', group: 'Group B', player1: 'Sarah Williams', player2: 'Lisa Anderson', score1: 4, score2: 1, date: '2025-06-08', time: '17:00', status: 'Completed' },
    { id: 9, round: 'Round 3', group: 'Group A', player1: 'Alex Johnson', player2: 'Maria Garcia', score1: 0, score2: 0, date: '2025-06-15', time: '14:00', status: 'Scheduled' },
    { id: 10, round: 'Round 3', group: 'Group A', player1: 'James Smith', player2: 'Emily Chen', score1: 0, score2: 0, date: '2025-06-15', time: '15:00', status: 'Scheduled' },
  ]);

  const handleExportBracket = () => {
    toast.success('Exporting bracket as PNG...', {
      description: 'High-quality bracket image will be downloaded'
    });
  };

  const handleExportPDF = () => {
    toast.success('Generating PDF...', {
      description: 'Complete tournament report will be downloaded'
    });
  };

  const groupedStandings = standings.reduce((acc, standing) => {
    if (!acc[standing.group]) {
      acc[standing.group] = [];
    }
    acc[standing.group].push(standing);
    return acc;
  }, {});

  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {});

  return (
    <div className="tournament-view-container">
      {/* Header */}
      <div className="tournament-view-header">
        <button
          onClick={onBack}
          className="back-link"
        >
          <ArrowLeft size={20} />
          Back to Tournaments
        </button>

        <div className="header-content">
          <div>
            <h1 className="tournament-title">{tournament.name}</h1>
            <div className="tournament-tags">
              <span className="tournament-format-badge">
                {tournament.format}
              </span>
              <span className="tournament-status-badge">
                {tournament.status}
              </span>
              <span className="tournament-participants-badge">
                {tournament.participants} Participants
              </span>
            </div>
          </div>

          <div className="header-actions">
            <button
              onClick={handleExportBracket}
              className="action-button secondary-yellow"
            >
              <Download size={20} />
              Export Bracket PNG
            </button>
            <button
              onClick={handleExportPDF}
              className="action-button primary"
            >
              <Download size={20} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card tabs-card">
        <div className="tabs-nav">
          {['standings', 'matches', 'bracket'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${
                activeTab === tab
                  ? 'active'
                  : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Standings Tab */}
        {activeTab === 'standings' && (
          <div className="tab-content standings-tab">
            <div className="standings-grid">
              {Object.entries(groupedStandings).map(([group, players]) => (
                <div key={group} className="card standings-group-card">
                  <h3 className="standings-group-title">{group}</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="full-width-table standings-table">
                      <thead>
                        <tr className="standings-table-header-row">
                          <th className="standings-table-header-cell pos-col">Pos</th>
                          <th className="standings-table-header-cell player-col">Player</th>
                          <th className="standings-table-header-cell center-col">P</th>
                          <th className="standings-table-header-cell center-col">W</th>
                          <th className="standings-table-header-cell center-col">D</th>
                          <th className="standings-table-header-cell center-col">L</th>
                          <th className="standings-table-header-cell center-col">GD</th>
                          <th className="standings-table-header-cell center-col">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {players.map((player, index) => (
                          <motion.tr 
                            key={player.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={`standings-table-row ${
                              index < 2 ? 'highlighted-row' : ''
                            }`}
                          >
                            <td className="standings-table-cell">
                              <span className={`standings-position-badge ${
                                index === 0 ? 'gold' :
                                index === 1 ? 'blue' :
                                ''
                              }`}>
                                {index + 1}
                              </span>
                            </td>
                            <td className="standings-table-cell">{player.player}</td>
                            <td className="standings-table-cell center-text">{player.played}</td>
                            <td className="standings-table-cell center-text text-blue">{player.wins}</td>
                            <td className="standings-table-cell center-text">{player.draws}</td>
                            <td className="standings-table-cell center-text text-red">{player.losses}</td>
                            <td className={`standings-table-cell center-text ${player.goalDiff >= 0 ? 'text-blue' : 'text-red'}`}>
                              {player.goalDiff >= 0 ? '+' : ''}{player.goalDiff}
                            </td>
                            <td className="standings-table-cell center-text">{player.points}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="group-info-box">
                    <p className="group-info-text">
                      <span className="group-info-bullet"></span>
                      Top 2 advance to next stage
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="tab-content matches-tab">
            {Object.entries(groupedMatches).map(([round, roundMatches]) => (
              <div key={round} className="matches-round-section">
                <h3 className="matches-round-title">{round}</h3>
                
                <div className="matches-grid">
                  {roundMatches.map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card match-card" 
                    >
                      <div className="match-card-header">
                        <span className="match-group-badge">
                          {match.group}
                        </span>
                        <span className={`match-status-badge ${
                          match.status === 'Completed' 
                            ? 'completed'
                            : 'scheduled'
                        }`}>
                          {match.status}
                        </span>
                      </div>

                      <div className="match-score-section">
                        <div className="match-player-name">{match.player1}</div>
                        <div className="match-score-display">
                          <div className="score-box">
                            <span className="score-text">{match.score1}</span>
                          </div>
                          <span className="score-separator">:</span>
                          <div className="score-box">
                            <span className="score-text">{match.score2}</span>
                          </div>
                        </div>
                        <div className="match-player-name text-right">{match.player2}</div>
                      </div>

                      <div className="match-datetime">
                        <span>{match.date}</span>
                        <span>{match.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bracket Tab */}
        {activeTab === 'bracket' && (
          <div className="tab-content bracket-tab">
            <div className="bracket-info-message">
              <div className="info-box info-box-blue">
                <h3 className="info-box-title">Knockout Bracket</h3>
                <p className="info-box-text">
                  Bracket will be generated after group stage completion
                </p>
              </div>
              
              {/* Simplified bracket visualization */}
              <div className="bracket-visualization">
                <div className="bracket-stages-grid">
                  {/* Quarterfinals */}
                  <div className="bracket-stage">
                    <h4 className="bracket-stage-title">Quarter Finals</h4>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bracket-match-card">
                        <div className="match-label">Match {i}</div>
                        <div className="match-teams-grid">
                          <div className="match-team-item">
                            <span className="player-name">TBD</span>
                            <span className="score-placeholder">-</span>
                          </div>
                          <div className="match-team-item">
                            <span className="player-name">TBD</span>
                            <span className="score-placeholder">-</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Semifinals */}
                  <div className="bracket-stage">
                    <h4 className="bracket-stage-title">Semi Finals</h4>
                    {[1, 2].map(i => (
                      <div key={i} className="bracket-match-card semi-final">
                        <div className="match-label">Semi {i}</div>
                        <div className="match-teams-grid">
                          <div className="match-team-item">
                            <span className="player-name">TBD</span>
                            <span className="score-placeholder">-</span>
                          </div>
                          <div className="match-team-item">
                            <span className="player-name">TBD</span>
                            <span className="score-placeholder">-</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final */}
                  <div className="bracket-stage">
                    <h4 className="bracket-stage-title">Final</h4>
                    <div className="bracket-match-card final-match">
                      <div className="match-label">Championship</div>
                      <div className="match-teams-grid">
                        <div className="match-team-item">
                          <span className="player-name">TBD</span>
                          <span className="score-placeholder">-</span>
                        </div>
                        <div className="match-team-item">
                          <span className="player-name">TBD</span>
                          <span className="score-placeholder">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
