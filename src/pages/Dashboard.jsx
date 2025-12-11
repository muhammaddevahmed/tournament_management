import { Trophy, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../styles/Dashboard.css"; // Add this line

export default function Dashboard() {
  const stats = [
    {
      label: "Active Tournaments",
      value: "12",
      icon: Trophy,
      color: "#235789ff",
      change: "+3 this month",
    },
    {
      label: "Total Participants",
      value: "247",
      icon: Users,
      color: "#f1d302ff",
      change: "+18 this week",
    },
    {
      label: "Completed Matches",
      value: "1,432",
      icon: TrendingUp,
      color: "#235789ff", // Re-using color for demonstration
      change: "+89 today",
    },
    {
      label: "Upcoming Events",
      value: "5",
      icon: Calendar,
      color: "#f1d302ff", // Re-using color for demonstration
      change: "Next in 2 days",
    },
  ];

  const tournamentData = [
    { month: "Jan", tournaments: 8 },
    { month: "Feb", tournaments: 12 },
    { month: "Mar", tournaments: 15 },
    { month: "Apr", tournaments: 11 },
    { month: "May", tournaments: 18 },
    { month: "Jun", tournaments: 14 },
  ];

  const participantData = [
    { month: "Jan", participants: 180 },
    { month: "Feb", participants: 210 },
    { month: "Mar", participants: 245 },
    { month: "Apr", participants: 220 },
    { month: "May", participants: 280 },
    { month: "Jun", participants: 247 },
  ];

  const recentTournaments = [
    {
      id: 1,
      name: "Summer Championship 2025",
      format: "Multi-Stage",
      status: "Active",
      participants: 176,
      progress: 65,
    },
    {
      id: 2,
      name: "Winter League",
      format: "League",
      status: "Active",
      participants: 48,
      progress: 80,
    },
    {
      id: 3,
      name: "Spring Knockout Cup",
      format: "Knockout",
      status: "Completed",
      participants: 32,
      progress: 100,
    },
    {
      id: 4,
      name: "Monthly Round Robin",
      format: "Round Robin",
      status: "Active",
      participants: 64,
      progress: 45,
    },
    {
      id: 5,
      name: "Last Uma Challenge",
      format: "Last Uma Standing",
      status: "Scheduled",
      participants: 24,
      progress: 0,
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-section">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back! Here&apos;s your tournament overview.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: stat.color + "20" }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-change">{stat.change}</p>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3 className="chart-title">Tournaments Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tournamentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="var(--gray-900)" />
              <YAxis stroke="var(--gray-900)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--gray-50)",
                  border: "2px solid var(--blue-800)",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="tournaments"
                fill="var(--blue-800)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Participant Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={participantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="var(--gray-900)" />
              <YAxis stroke="var(--gray-900)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--gray-50)",
                  border: "2px solid var(--yellow-400)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="participants"
                stroke="var(--yellow-400)"
                strokeWidth={3}
                dot={{ fill: "var(--yellow-400)", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Tournaments */}
      <div className="recent-tournaments-section">
        <div className="recent-tournaments-header">
          <h3 className="recent-tournaments-title">Recent Tournaments</h3>
          {/* Corrected the link to be relative to the /admin path */}
          <Link to="/admin/manage-tournaments" className="view-all-link">
            View All
          </Link>
        </div>
        <div className="tournament-table-container">
          <table className="tournament-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Tournament Name</th>
                <th className="table-header-cell">Format</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Participants</th>
                <th className="table-header-cell">Progress</th>
              </tr>
            </thead>
            <tbody>
              {recentTournaments.map((tournament) => (
                <tr key={tournament.id} className="table-row">
                  <td className="table-cell">
                    {/* Corrected the link to be relative to the /admin path */}
                    <Link
                      to={`/admin/tournament/${tournament.id}`}
                      className="tournament-name-link"
                    >
                      {tournament.name}
                    </Link>
                  </td>
                  <td className="table-cell-text">{tournament.format}</td>
                  <td className="table-cell">
                    <span
                      className={`status-badge ${
                        tournament.status === "Active"
                          ? "status-active"
                          : tournament.status === "Completed"
                          ? "status-completed"
                          : "status-scheduled"
                      }`}
                    >
                      {tournament.status}
                    </span>
                  </td>
                  <td className="table-cell-text">{tournament.participants}</td>
                  <td className="table-cell">
                    <div className="progress-container">
                      <div className="progress-bar-background">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${tournament.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">
                        {tournament.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
