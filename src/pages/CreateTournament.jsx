import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  Users,
  Shuffle,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CreateTournament.css";

export default function CreateTournament() {
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentFormat, setTournamentFormat] = useState("");
  const [stages, setStages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const [showStageModal, setShowStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState(null);

  // Stage form state
  const [stageType, setStageType] = useState("");
  const [stageParticipants, setStageParticipants] = useState("");
  const [stageGroupCount, setStageGroupCount] = useState("");
  const [stagePlayersPerGroup, setStagePlayersPerGroup] = useState("");
  const [stageAdvancementRules, setStageAdvancementRules] = useState("");
  const [stagePlayoffs, setStagePlayoffs] = useState(false);
  const [stageMaxRounds, setStageMaxRounds] = useState("10");

  const formatOptions = [
    { value: "league", label: "League" },
    { value: "roundrobin", label: "Round Robin" },
    { value: "knockout", label: "Knockout" },
    { value: "lastuma", label: "Last Uma Standing" },
    { value: "multistage", label: "Multi-Stage Tournament" },
  ];

  const handleAddStage = () => {
    if (!stageType || !stageParticipants) {
      toast.error("Please fill in required fields");
      return;
    }

    const newStage = {
      id: Date.now(),
      type: stageType,
      participants: parseInt(stageParticipants),
      groupCount: parseInt(stageGroupCount) || null,
      playersPerGroup: parseInt(stagePlayersPerGroup) || null,
      advancementRules: stageAdvancementRules,
      playoffs: stagePlayoffs,
      maxRounds: parseInt(stageMaxRounds) || null,
    };

    if (editingStage !== null) {
      setStages(stages.map((s, i) => (i === editingStage ? newStage : s)));
      toast.success("Stage updated successfully");
    } else {
      setStages([...stages, newStage]);
      toast.success("Stage added successfully");
    }

    resetStageForm();
  };

  const resetStageForm = () => {
    setStageType("");
    setStageParticipants("");
    setStageGroupCount("");
    setStagePlayersPerGroup("");
    setStageAdvancementRules("");
    setStagePlayoffs(false);
    setStageMaxRounds("10");
    setShowStageModal(false);
    setEditingStage(null);
  };

  const handleEditStage = (index) => {
    const stage = stages[index];
    setStageType(stage.type);
    setStageParticipants(stage.participants.toString());
    setStageGroupCount(stage.groupCount?.toString() || "");
    setStagePlayersPerGroup(stage.playersPerGroup?.toString() || "");
    setStageAdvancementRules(stage.advancementRules);
    setStagePlayoffs(stage.playoffs);
    setStageMaxRounds(stage.maxRounds?.toString() || "10");
    setEditingStage(index);
    setShowStageModal(true);
  };

  const handleDeleteStage = (index) => {
    setStages(stages.filter((_, i) => i !== index));
    toast.success("Stage removed");
  };

  const moveStage = (index, direction) => {
    const newStages = [...stages];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newStages[index], newStages[targetIndex]] = [
      newStages[targetIndex],
      newStages[index],
    ];
    setStages(newStages);
  };

  const handleSaveTournament = () => {
    if (!tournamentName) {
      toast.error("Please enter tournament name");
      return;
    }

    if (!tournamentFormat) {
      toast.error("Please select tournament format");
      return;
    }

    if (tournamentFormat === "multistage" && stages.length === 0) {
      toast.error("Please add at least one stage");
      return;
    }

    toast.success("Tournament created successfully!");
    // Reset form
    setTournamentName("");
    setTournamentFormat("");
    setStages([]);
  };

  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      toast.error("Player name cannot be empty.");
      return;
    }
    setPlayers([...players, { id: Date.now(), name: playerName.trim() }]);
    setPlayerName("");
    toast.success(`Player "${playerName.trim()}" added.`);
  };

  const handleRemovePlayer = (id, name) => {
    setPlayers(players.filter((p) => p.id !== id));
    toast.error(`Player "${name}" removed.`);
  };

  const handleShuffleSeeding = () => {
    if (players.length < 2) {
      toast.info("You need at least two players to shuffle seeding.");
      return;
    }
    // Fisher-Yates (aka Knuth) Shuffle
    const array = [...players];
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setPlayers(array);
    toast.success("Player seeding has been shuffled!");
  };

  const getStageTypeLabel = (type) => {
    const labels = {
      league: "League",
      roundrobin: "Round Robin",
      knockout: "Knockout",
      lastuma: "Last Uma Standing",
    };
    return labels[type] || type;
  };

  return (
    <div className="create-tournament-container">
      {" "}
      {/* Refactored */}
      <div className="create-tournament-header-section">
        {" "}
        {/* Refactored */}
        <h1 className="create-tournament-title">Create Tournament</h1>{" "}
        {/* Refactored */}
        <p className="create-tournament-subtitle">
          Set up a new tournament with custom format and rules
        </p>{" "}
        {/* Refactored */}
      </div>
      {/* Basic Information */}
      <div className="card basic-info-card">
        {" "}
        {/* Refactored */}
        <h3 className="card-title">Basic Information</h3> {/* Refactored */}
        <div className="form-grid">
          {" "}
          {/* Refactored */}
          <div>
            <label className="form-label">Tournament Name</label>{" "}
            {/* Refactored */}
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              className="form-input"
              placeholder="e.g., Summer Championship 2025"
            />
          </div>
          <div>
            <label className="form-label">Tournament Format</label>{" "}
            {/* Refactored */}
            <select
              value={tournamentFormat}
              onChange={(e) => setTournamentFormat(e.target.value)}
              className="form-select"
            >
              <option value="">Select format...</option>
              {formatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Manage Players */}
      <div className="card manage-players-card">
        <div className="manage-players-header">
          <div className="card-title-container">
            <Users className="card-title-icon" size={24} />
            <h3 className="card-title">Manage Players</h3>
          </div>
          {players.length > 1 && (
            <button onClick={handleShuffleSeeding} className="shuffle-button">
              <Shuffle size={18} />
              Shuffle Seeding
            </button>
          )}
        </div>
        <div className="add-player-section">
          <div className="add-player-input-wrapper">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddPlayer()}
              className="form-input"
              placeholder="Enter player name..."
            />
            <button onClick={handleAddPlayer} className="add-player-button">
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        <div className="players-list-container">
          {players.length === 0 ? (
            <div className="empty-players-message">
              <p>No players have been added yet.</p>
            </div>
          ) : (
            <ul className="players-list">
              {players.map((player, index) => (
                <motion.li
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="player-item"
                >
                  <div className="player-seed">{index + 1}</div>
                  <span className="player-name">{player.name}</span>
                  <button
                    onClick={() => handleRemovePlayer(player.id, player.name)}
                    className="remove-player-button"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Multi-Stage Builder */}
      {tournamentFormat === "multistage" && (
        <div className="card multi-stage-builder-card">
          {" "}
          {/* Refactored */}
          <div className="multi-stage-builder-header">
            {" "}
            {/* Refactored */}
            <div>
              <h3 className="card-title mb-2">Multi-Stage Builder</h3>{" "}
              {/* Refactored */}
              <p className="card-subtitle">
                Add and configure tournament stages
              </p>{" "}
              {/* Refactored */}
            </div>
            <button
              onClick={() => setShowStageModal(true)}
              className="add-stage-button"
            >
              <Plus size={20} />
              Add Stage
            </button>
          </div>
          <div className="p-8">
            {stages.length === 0 ? (
              <div className="empty-stages-message">
                {" "}
                {/* Refactored */}
                <p>
                  No stages added yet. Click &quot;Add Stage&quot; to begin.
                </p>
              </div>
            ) : (
              <div className="stages-list">
                {" "}
                {/* Refactored */}
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="stage-item"
                  >
                    <div className="stage-item-header">
                      {" "}
                      {/* Refactored */}
                      <div className="stage-item-info">
                        {" "}
                        {/* Refactored */}
                        <div className="stage-number-badge">
                          {" "}
                          {/* Refactored */}
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="stage-title">
                            Stage {index + 1}: {getStageTypeLabel(stage.type)}
                          </h4>{" "}
                          {/* Refactored */}
                          <p className="stage-participants-info">
                            {stage.participants} Participants
                          </p>{" "}
                          {/* Refactored */}
                        </div>
                      </div>
                      <div className="stage-actions">
                        {" "}
                        {/* Refactored */}
                        {index > 0 && (
                          <button
                            onClick={() => moveStage(index, "up")}
                            className="stage-action-button"
                          >
                            <ChevronUp size={20} />
                          </button>
                        )}
                        {index < stages.length - 1 && (
                          <button
                            onClick={() => moveStage(index, "down")}
                            className="stage-action-button"
                          >
                            <ChevronDown size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditStage(index)}
                          className="stage-action-button"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteStage(index)}
                          className="stage-action-button delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="stage-details-grid">
                      {" "}
                      {/* Refactored */}
                      {stage.groupCount && (
                        <div>
                          <p className="stage-detail-label">Groups</p>{" "}
                          {/* Refactored */}
                          <p className="stage-detail-value">
                            {stage.groupCount} groups
                          </p>{" "}
                          {/* Refactored */}
                        </div>
                      )}
                      {stage.playersPerGroup && (
                        <div>
                          <p className="stage-detail-label">
                            Players per Group
                          </p>{" "}
                          {/* Refactored */}
                          <p className="stage-detail-value">
                            {stage.playersPerGroup} players
                          </p>{" "}
                          {/* Refactored */}
                        </div>
                      )}
                      {stage.maxRounds && (
                        <div>
                          <p className="stage-detail-label">Max Rounds</p>{" "}
                          {/* Refactored */}
                          <p className="stage-detail-value">
                            {stage.maxRounds} rounds
                          </p>{" "}
                          {/* Refactored */}
                        </div>
                      )}
                      {stage.advancementRules && (
                        <div className="advancement-rules-section">
                          {" "}
                          {/* Refactored */}
                          <p className="stage-detail-label">
                            Advancement Rules
                          </p>{" "}
                          {/* Refactored */}
                          <p className="stage-detail-value">
                            {stage.advancementRules}
                          </p>{" "}
                          {/* Refactored */}
                        </div>
                      )}
                      {stage.playoffs && (
                        <div>
                          <p className="stage-detail-label">Playoffs</p>{" "}
                          {/* Refactored */}
                          <p className="stage-detail-value playoffs-enabled">
                            Enabled
                          </p>{" "}
                          {/* Refactored */}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Single Format Configuration */}
      {tournamentFormat && tournamentFormat !== "multistage" && (
        <div className="card single-format-config-card">
          {" "}
          {/* Refactored */}
          <h3 className="card-title">Format Configuration</h3>{" "}
          {/* Refactored */}
          <div className="form-grid">
            <div>
              <label className="form-label">Number of Participants</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 32"
              />
            </div>

            {tournamentFormat === "roundrobin" && (
              <>
                <div>
                  <label className="form-label">Number of Groups</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 8"
                  />
                </div>
                <div>
                  <label className="form-label">Players per Group</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 4"
                  />
                </div>
              </>
            )}

            {tournamentFormat === "league" && (
              <div>
                <label className="form-label">Maximum Rounds (max 10)</label>
                <input
                  type="number"
                  max="10"
                  className="form-input"
                  placeholder="e.g., 10"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="action-buttons-container">
        {" "}
        {/* Refactored */}
        <button
          onClick={() => {
            setTournamentName("");
            setTournamentFormat("");
            setStages([]);
          }}
          className="cancel-button"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveTournament}
          className="save-tournament-button"
        >
          <Save size={20} />
          Create Tournament
        </button>
      </div>
      {/* Stage Modal */}
      <AnimatePresence>
        {showStageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="stage-modal-overlay"
            onClick={resetStageForm}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="stage-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="stage-modal-header">
                {" "}
                {/* Refactored */}
                <h3 className="stage-modal-title">
                  {editingStage !== null ? "Edit Stage" : "Add New Stage"}
                </h3>{" "}
                {/* Refactored */}
              </div>

              <div className="stage-modal-body">
                {" "}
                {/* Refactored */}
                <div>
                  <label className="form-label">Stage Type</label>
                  <select
                    value={stageType}
                    onChange={(e) => setStageType(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select type...</option>
                    <option value="league">League</option>
                    <option value="roundrobin">Round Robin</option>
                    <option value="knockout">Knockout</option>
                    <option value="lastuma">Last Uma Standing</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Number of Participants</label>
                  <input
                    type="number"
                    value={stageParticipants}
                    onChange={(e) => setStageParticipants(e.target.value)}
                    className="form-input"
                    placeholder="e.g., 176"
                  />
                </div>
                {stageType === "roundrobin" && (
                  <>
                    <div className="form-grid-modal">
                      {" "}
                      {/* Refactored */}
                      <div>
                        <label className="form-label">Number of Groups</label>
                        <input
                          type="number"
                          value={stageGroupCount}
                          onChange={(e) => setStageGroupCount(e.target.value)}
                          className="form-input"
                          placeholder="e.g., 8"
                        />
                      </div>
                      <div>
                        <label className="form-label">Players per Group</label>
                        <input
                          type="number"
                          value={stagePlayersPerGroup}
                          onChange={(e) =>
                            setStagePlayersPerGroup(e.target.value)
                          }
                          className="form-input"
                          placeholder="e.g., 4"
                        />
                      </div>
                    </div>

                    <div className="checkbox-container">
                      {" "}
                      {/* Refactored */}
                      <input
                        type="checkbox"
                        id="playoffs"
                        checked={stagePlayoffs}
                        onChange={(e) => setStagePlayoffs(e.target.checked)}
                        className="form-checkbox"
                      />
                      <label htmlFor="playoffs" className="form-checkbox-label">
                        Enable Playoffs
                      </label>{" "}
                      {/* Refactored */}
                    </div>
                  </>
                )}
                {stageType === "league" && (
                  <div>
                    <label className="form-label">
                      Maximum Rounds (max 10)
                    </label>
                    <input
                      type="number"
                      max="10"
                      value={stageMaxRounds}
                      onChange={(e) => setStageMaxRounds(e.target.value)}
                      className="form-input"
                      placeholder="10"
                    />
                  </div>
                )}
                <div>
                  <label className="form-label">Advancement Rules</label>
                  <textarea
                    value={stageAdvancementRules}
                    onChange={(e) => setStageAdvancementRules(e.target.value)}
                    className="form-textarea"
                    rows="3"
                    placeholder="e.g., Ranks 1-16 auto-advance, Ranks 17-48 go to playoffs for 16 additional spots"
                  />
                </div>
              </div>

              <div className="stage-modal-footer">
                {" "}
                {/* Refactored */}
                <button onClick={resetStageForm} className="cancel-button">
                  Cancel
                </button>
                <button
                  onClick={handleAddStage}
                  className="save-tournament-button"
                >
                  {editingStage !== null ? "Update Stage" : "Add Stage"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
