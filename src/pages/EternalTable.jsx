import { useState } from 'react';
import { Search, TrendingUp, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/EternalTable.css'; // Add this line

export default function EternalTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const itemsPerPage = 20;

  // Mock data representing 100+ tournaments combined
  const eternalRankings = Array.from({ length: 150 }, (_, i) => {
    const names = [
      'Alex Johnson', 'Maria Garcia', 'James Smith', 'Emily Chen', 'Michael Brown',
      'Sarah Williams', 'David Martinez', 'Lisa Anderson', 'Robert Taylor', 'Jessica Lee',
      'Daniel Kim', 'Sophia Rodriguez', 'William Zhang', 'Olivia Patel', 'Christopher Lee',
      'Emma Wilson', 'Matthew Davis', 'Isabella Martin', 'Andrew Thompson', 'Mia Johnson',
      'Joshua Garcia', 'Charlotte Brown', 'Ryan Miller', 'Amelia Jones', 'Brandon Taylor',
      'Harper Anderson', 'Nicholas White', 'Evelyn Thomas', 'Tyler Martinez', 'Abigail Robinson'
    ];

    const basePoints = 500 - i * 3;
    const wins = Math.floor(80 - i * 0.5);
    const draws = Math.floor(15 + Math.random() * 10);
    const losses = Math.floor(20 + i * 0.3);
    const scoreDiff = Math.floor(200 - i * 2);

    return {
      id: i + 1,
      rank: i + 1,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
      points: basePoints + Math.floor(Math.random() * 20),
      wins,
      draws,
      losses,
      scoreDiff: scoreDiff + Math.floor(Math.random() * 40) - 20,
      tournaments: Math.floor(100 + Math.random() * 50),
      avgRating: Math.floor(1500 + (500 - i * 3))
    };
  });

  const filteredRankings = eternalRankings.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRankings = filteredRankings.slice(startIndex, startIndex + itemsPerPage);

  const getTopPlayers = () => {
    return eternalRankings.slice(0, 3);
  };

  return (
    <div className="eternal-table-container"> {/* Refactored */}
      <div className="eternal-table-header-section"> {/* Refactored */}
        <h1 className="eternal-table-title">Eternal Table</h1> {/* Refactored */}
        <p className="eternal-table-subtitle">All-time rankings across all tournaments</p> {/* Refactored */}
      </div>

      {/* Top 3 Players Podium */}
      <div className="podium-grid"> {/* Refactored */}
        {getTopPlayers().map((player, index) => {
          const icons = [Trophy, Award, Award];
          const Icon = icons[index];
          const colors = ['var(--yellow-400)', 'var(--gray-400)', 'var(--orange-700)']; // Using CSS variables for consistency
          
          let podiumClass = '';
          if (index === 0) podiumClass = 'podium-card gold';
          else if (index === 1) podiumClass = 'podium-card silver';
          else if (index === 2) podiumClass = 'podium-card bronze';

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={podiumClass}
            >
              <div className="podium-content"> {/* Refactored */}
                <div className="podium-icon-wrapper" style={{ backgroundColor: colors[index] + '20' }}> {/* Refactored */}
                  <Icon size={32} style={{ color: colors[index] }} />
                </div>
                <div className="podium-rank-text" style={{ color: colors[index] }}> {/* Refactored */}
                  Rank #{player.rank}
                </div>
                <h3 className="podium-player-name">{player.name}</h3> {/* Refactored */}
                <div className="podium-stats"> {/* Refactored */}
                  <div className="podium-stat-item"> {/* Refactored */}
                    <span className="podium-stat-label">Points</span> {/* Refactored */}
                    <span className="podium-stat-value text-blue">{player.points}</span> {/* Refactored */}
                  </div>
                  <div className="podium-stat-item"> {/* Refactored */}
                    <span className="podium-stat-label">W/D/L</span> {/* Refactored */}
                    <span className="podium-stat-value">{player.wins}/{player.draws}/{player.losses}</span> {/* Refactored */}
                  </div>
                  <div className="podium-stat-item"> {/* Refactored */}
                    <span className="podium-stat-label">Score Diff</span> {/* Refactored */}
                    <span className={`podium-stat-value ${player.scoreDiff >= 0 ? 'text-blue' : 'text-red'}`}> {/* Refactored */}
                      {player.scoreDiff >= 0 ? '+' : ''}{player.scoreDiff}
                    </span>
                  </div>
                  <div className="podium-stat-item"> {/* Refactored */}
                    <span className="podium-stat-label">Tournaments</span> {/* Refactored */}
                    <span className="podium-stat-value">{player.tournaments}</span> {/* Refactored */}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="card search-filter-card"> {/* Refactored */}
        <div className="search-filter-controls"> {/* Refactored */}
          <div className="search-input-wrapper"> {/* Refactored */}
            <Search className="search-icon" size={20} /> {/* Refactored */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="form-input search-input" 
              placeholder="Search players..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select filter-select" 
          >
            <option value="all">All Players</option>
            <option value="top100">Top 100</option>
            <option value="top50">Top 50</option>
            <option value="top10">Top 10</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid"> {/* Refactored */}
        <div className="card stat-card"> {/* Refactored */}
          <div className="stat-card-header"> {/* Refactored */}
            <TrendingUp className="stat-icon" size={24} /> {/* Refactored */}
            <p className="stat-label">Total Players</p> {/* Refactored */}
          </div>
          <h3 className="stat-value">150</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Total Tournaments</p> {/* Refactored */}
          <h3 className="stat-value">128</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Total Matches</p> {/* Refactored */}
          <h3 className="stat-value">3,842</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Years Active</p> {/* Refactored */}
          <h3 className="stat-value">5+</h3> {/* Refactored */}
        </div>
      </div>

      {/* Rankings Table */}
      <div className="card rankings-table-card"> {/* Refactored */}
        <div className="rankings-table-header"> {/* Refactored */}
          <h3 className="rankings-table-title">All-Time Rankings</h3> {/* Refactored */}
        </div>

        <div className="overflow-x-auto">
          <table className="full-width-table"> {/* Refactored */}
            <thead>
              <tr className="table-header-row"> {/* Refactored */}
                <th className="table-header-cell">Rank</th> {/* Refactored */}
                <th className="table-header-cell">Player</th> {/* Refactored */}
                <th className="table-header-cell">Points</th> {/* Refactored */}
                <th className="table-header-cell">Wins</th> {/* Refactored */}
                <th className="table-header-cell">Draws</th> {/* Refactored */}
                <th className="table-header-cell">Losses</th> {/* Refactored */}
                <th className="table-header-cell">Score Diff</th> {/* Refactored */}
                
              </tr>
            </thead>
            <tbody>
              {paginatedRankings.map((player) => (
                <tr 
                  key={player.id} 
                  className={`table-row ${
                    player.rank <= 3 ? 'top-rank-row' : ''
                  }`}
                >
                  <td className="table-cell">
                    <span className={`rank-badge ${
                      player.rank === 1 ? 'rank-gold' :
                      player.rank === 2 ? 'rank-silver' :
                      player.rank === 3 ? 'rank-bronze' :
                      'rank-default'
                    }`}>
                      {player.rank}
                    </span>
                  </td>
                  <td className="table-cell">{player.name}</td>
                  <td className="table-cell text-blue">{player.points}</td> {/* Refactored */}
                  <td className="table-cell">{player.draws}</td>
                  <td className="table-cell">{player.losses}</td>
                  <td className={`table-cell ${player.scoreDiff >= 0 ? 'text-blue' : 'text-red'}`}> {/* Refactored */}
                    {player.scoreDiff >= 0 ? '+' : ''}{player.scoreDiff}
                  </td>
                  <td className="table-cell">{player.tournaments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container"> {/* Refactored */}
          <p className="pagination-info"> {/* Refactored */}
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRankings.length)} of {filteredRankings.length} players
          </p>
          
          <div className="pagination-buttons"> {/* Refactored */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-button nav-button" 
            >
              Previous
            </button>
            
            <div className="pagination-pages"> {/* Refactored */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-button page-number ${
                      currentPage === pageNum
                        ? 'active'
                        : 'inactive'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="pagination-button nav-button" 
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
