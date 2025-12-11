import { useState } from 'react';
import { Save, Bell, Shield, Palette, Globe } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/Settings.css'; // Add this line

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Tournament Pro',
    emailNotifications: true,
    tournamentAlerts: true,
    matchReminders: false,
    autoScheduling: true,
    defaultFormat: 'roundrobin',
    pointsWin: 3,
    pointsDraw: 1,
    pointsLoss: 0,
    language: 'en',
    timezone: 'UTC',
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="settings-container"> {/* Refactored */}
      <div className="settings-header-section"> {/* Refactored */}
        <h1 className="settings-title">Settings</h1> {/* Refactored */}
        <p className="settings-subtitle">Configure system preferences and defaults</p> {/* Refactored */}
      </div>

      {/* General Settings */}
      <div className="card settings-card"> {/* Refactored */}
        <div className="card-header"> {/* Refactored */}
          <Globe className="card-icon" size={24} /> {/* Refactored */}
          <h3 className="card-title">General Settings</h3> {/* Refactored */}
        </div>

        <div className="card-body"> {/* Refactored */}
          <div>
            <label className="form-label">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-grid-two-cols"> {/* Refactored */}
            <div>
              <label className="form-label">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="form-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="form-label">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="form-select"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card settings-card"> {/* Refactored */}
        <div className="card-header"> {/* Refactored */}
          <Bell className="card-icon" size={24} /> {/* Refactored */}
          <h3 className="card-title">Notifications</h3> {/* Refactored */}
        </div>

        <div className="card-body"> {/* Refactored */}
          <div className="setting-item"> {/* Refactored */}
            <div>
              <p className="setting-label">Email Notifications</p> {/* Refactored */}
              <p className="setting-description">Receive email updates about tournaments</p> {/* Refactored */}
            </div>
            <label className="toggle-switch"> {/* Refactored */}
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="toggle-slider" /> {/* Refactored */}
            </label>
          </div>

          <div className="setting-item"> {/* Refactored */}
            <div>
              <p className="setting-label">Tournament Alerts</p> {/* Refactored */}
              <p className="setting-description">Get notified when tournaments start or end</p> {/* Refactored */}
            </div>
            <label className="toggle-switch"> {/* Refactored */}
              <input
                type="checkbox"
                checked={settings.tournamentAlerts}
                onChange={(e) => handleChange('tournamentAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="toggle-slider" /> {/* Refactored */}
            </label>
          </div>

          <div className="setting-item"> {/* Refactored */}
            <div>
              <p className="setting-label">Match Reminders</p> {/* Refactored */}
              <p className="setting-description">Reminder notifications before matches</p> {/* Refactored */}
            </div>
            <label className="toggle-switch"> {/* Refactored */}
              <input
                type="checkbox"
                checked={settings.matchReminders}
                onChange={(e) => handleChange('matchReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="toggle-slider" /> {/* Refactored */}
            </label>
          </div>
        </div>
      </div>

      {/* Tournament Defaults */}
      <div className="card settings-card"> {/* Refactored */}
        <div className="card-header"> {/* Refactored */}
          <Palette className="card-icon" size={24} /> {/* Refactored */}
          <h3 className="card-title">Tournament Defaults</h3> {/* Refactored */}
        </div>

        <div className="card-body"> {/* Refactored */}
          <div>
            <label className="form-label">Default Tournament Format</label>
            <select
              value={settings.defaultFormat}
              onChange={(e) => handleChange('defaultFormat', e.target.value)}
              className="form-select"
            >
              <option value="league">League</option>
              <option value="roundrobin">Round Robin</option>
              <option value="knockout">Knockout</option>
              <option value="lastuma">Last Uma Standing</option>
            </select>
          </div>

          <div className="form-grid-three-cols"> {/* Refactored */}
            <div>
              <label className="form-label">Points for Win</label>
              <input
                type="number"
                value={settings.pointsWin}
                onChange={(e) => handleChange('pointsWin', parseInt(e.target.value))}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Points for Draw</label>
              <input
                type="number"
                value={settings.pointsDraw}
                onChange={(e) => handleChange('pointsDraw', parseInt(e.target.value))}
                className="form-input"
              />
            </div>
            <div className="form-flex-one"> {/* Refactored */}
              <label className="form-label">Points for Loss</label>
              <input
                type="number"
                value={settings.pointsLoss}
                onChange={(e) => handleChange('pointsLoss', parseInt(e.target.value))}
                className="form-input"
              />
            </div>
          </div>

          <div className="setting-item"> {/* Refactored */}
            <div>
              <p className="setting-label">Auto Scheduling</p> {/* Refactored */}
              <p className="setting-description">Automatically generate match schedules</p> {/* Refactored */}
            </div>
            <label className="toggle-switch"> {/* Refactored */}
              <input
                type="checkbox"
                checked={settings.autoScheduling}
                onChange={(e) => handleChange('autoScheduling', e.target.checked)}
                className="sr-only peer"
              />
              <div className="toggle-slider" /> {/* Refactored */}
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container"> {/* Refactored */}
        <button
          onClick={handleSave}
          className="action-button primary large" 
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
