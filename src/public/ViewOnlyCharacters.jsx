import { useState } from 'react';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Characters.css';


export default function ViewOnlyCharacters() {
  const [showProgressModal, setShowProgressModal] = useState(false);

  const [characters, setCharacters] = useState([
    { id: 1, name: 'Shadow Warrior', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400', status: 'Active', gamesPlayed: 24, wins: 18, losses: 6 },
    { id: 2, name: 'Dragon Knight', image: 'https://images.unsplash.com/photo-1551847812-c7f7ff93950c?w=400', status: 'Active', gamesPlayed: 32, wins: 22, losses: 10 },
    { id: 3, name: 'Phoenix Mage', image: 'https://images.unsplash.com/photo-1518640165601-0e4b1a8e1d7f?w=400', status: 'Eliminated', gamesPlayed: 15, wins: 8, losses: 7 },
    { id: 4, name: 'Storm Archer', image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400', status: 'Active', gamesPlayed: 28, wins: 20, losses: 8 },
    { id: 5, name: 'Ice Guardian', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400', status: 'Active', gamesPlayed: 21, wins: 14, losses: 7 },
    { id: 6, name: 'Fire Titan', image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400', status: 'Eliminated', gamesPlayed: 12, wins: 5, losses: 7 },
  ]);

  const activeCharacters = characters.filter(c => c.status === 'Active');
  const eliminatedCharacters = characters.filter(c => c.status === 'Eliminated');

  return (
    <div className="characters-container"> {/* Refactored */}
      <div className="characters-header-section"> {/* Refactored */}
        <h1 className="characters-title">Last Uma Standing - Characters</h1> {/* Refactored */}
        <p className="characters-subtitle">View characters for Last Uma Standing tournaments</p> {/* Refactored */}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-group"> {/* Refactored */}
        <button
          onClick={() => setShowProgressModal(true)}
          className="action-button secondary-yellow"
        >
          <Eye size={20} />
          View Tournament Progress
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid"> {/* Refactored */}
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Total Characters</p> {/* Refactored */}
          <h3 className="stat-value text-blue">{characters.length}</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Active</p> {/* Refactored */}
          <h3 className="stat-value text-blue">{activeCharacters.length}</h3> {/* Refactored */}
        </div>
        <div className="card stat-card"> {/* Refactored */}
          <p className="stat-label">Eliminated</p> {/* Refactored */}
          <h3 className="stat-value text-red">{eliminatedCharacters.length}</h3> {/* Refactored */}
        </div>
      </div>

      {/* Active Characters */}
      <div className="active-characters-section"> {/* Refactored */}
        <h3 className="section-title">Active Characters</h3> {/* Refactored */}
        <div className="character-grid"> {/* Refactored */}
          {activeCharacters.map((character) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card character-card"
            >
              <div className="character-image-wrapper"> {/* Refactored */}
                <img
                  src={character.image}
                  alt={character.name}
                  className="character-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400';
                  }}
                />
              </div>
              <div className="character-details"> {/* Refactored */}
                <div className="character-header"> {/* Refactored */}
                  <div>
                    <h4 className="character-name">{character.name}</h4> {/* Refactored */}
                    <span className="character-status-badge active"> {/* Refactored */}
                      {character.status}
                    </span>
                  </div>
                </div>

                <div className="character-stats"> {/* Refactored */}
                  <div className="character-stat-item"> {/* Refactored */}
                    <span className="character-stat-label">Games Played</span> {/* Refactored */}
                    <span className="character-stat-value">{character.gamesPlayed}</span> {/* Refactored */}
                  </div>
                  <div className="character-stat-item"> {/* Refactored */}
                    <span className="character-stat-label">Wins</span> {/* Refactored */}
                    <span className="character-stat-value text-blue">{character.wins}</span> {/* Refactored */}
                  </div>
                  <div className="character-stat-item"> {/* Refactored */}
                    <span className="character-stat-label">Losses</span> {/* Refactored */}
                    <span className="character-stat-value text-red">{character.losses}</span> {/* Refactored */}
                  </div>
                  <div className="character-stat-item"> {/* Refactored */}
                    <span className="character-stat-label">Win Rate</span> {/* Refactored */}
                    <span className="character-stat-value text-yellow"> {/* Refactored */}
                      {character.gamesPlayed > 0
                        ? Math.round((character.wins / character.gamesPlayed) * 100) + '%'
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Eliminated Characters */}
      {eliminatedCharacters.length > 0 && (
        <div className="eliminated-characters-section">
          <h3 className="text-[#020100ff] mb-4">Eliminated Characters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eliminatedCharacters.map((character) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card character-card eliminated"
              >
                <div className="character-image-wrapper eliminated-image-wrapper"> {/* Refactored */}
                  <img
                    src={character.image}
                    alt={character.name}
                    className="character-image grayscale"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400';
                    }}
                  />
                  <div className="eliminated-image-overlay" /> {/* Refactored */}
                </div>
                <div className="character-details">
                  <div className="character-header">
                    <div>
                      <h4 className="character-name">{character.name}</h4>
                      <span className="character-status-badge eliminated"> {/* Refactored */}
                        {character.status}
                      </span>
                    </div>
                  </div>

                  <div className="character-stats">
                    <div className="character-stat-item">
                      <span className="character-stat-label">Games Played</span>
                      <span className="character-stat-value">{character.gamesPlayed}</span>
                    </div>
                    <div className="character-stat-item">
                      <span className="character-stat-label">Wins</span>
                      <span className="character-stat-value text-blue">{character.wins}</span>
                    </div>
                    <div className="character-stat-item">
                      <span className="character-stat-label">Losses</span>
                      <span className="character-stat-value text-red">{character.losses}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Modal */}
      <AnimatePresence>
        {showProgressModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowProgressModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal-content large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header"> {/* Refactored */}
                <h3 className="modal-title">Tournament Progress</h3> {/* Refactored */}
              </div>

              <div className="modal-body"> {/* Refactored */}
                <div className="overall-progress-section"> {/* Refactored */}
                  <div className="progress-header"> {/* Refactored */}
                    <span className="progress-label">Overall Progress</span> {/* Refactored */}
                    <span className="progress-percentage text-blue">60%</span> {/* Refactored */}
                  </div>
                  <div className="progress-bar-background"> {/* Refactored */}
                    <div className="progress-bar-fill yellow" style={{ width: '60%' }} /> {/* Refactored */}
                  </div>
                </div>

                <div className="progress-characters-list"> {/* Refactored */}
                  {activeCharacters.slice(0, 5).map((character, index) => (
                    <div key={character.id} className="progress-character-item"> {/* Refactored */}
                      <div className="progress-character-image-wrapper"> {/* Refactored */}
                        <img
                          src={character.image}
                          alt={character.name}
                          className="progress-character-image"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400';
                          }}
                        />
                      </div>
                      <div className="progress-character-details"> {/* Refactored */}
                        <h4 className="progress-character-name">{character.name}</h4> {/* Refactored */}
                        <div className="progress-character-stats"> {/* Refactored */}
                          <span>{character.wins}W - {character.losses}L</span>
                          <span>
                            Win Rate: {character.gamesPlayed > 0
                              ? Math.round((character.wins / character.gamesPlayed) * 100) + '%'
                              : '0%'}
                          </span>
                        </div>
                      </div>
                      <div className="progress-character-rank text-black">Rank #{index + 1}</div> {/* Refactored */}
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer"> {/* Refactored */}
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="action-button primary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
