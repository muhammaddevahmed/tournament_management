import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTournament from "./pages/CreateTournament";
import ManageTournaments from "./pages/ManageTournaments";
import ManageParticipants from "./pages/ManageParticipants";
import EternalTable from "./pages/EternalTable";
import Characters from "./pages/Characters";
import Settings from "./pages/Settings";
import SuperAdmin from "./pages/SuperAdmin";
import TournamentView from "./pages/TournamentView";
import Layout from "./components/Layout";
import PublicApp from "./public/PublicApp";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!currentUser;

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicApp />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated ? (
                <Layout currentUser={currentUser} onLogout={handleLogout}>
                  <Routes>
                    {/* Note: Paths here are relative to /admin */}
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="create-tournament" element={<CreateTournament />} />
                    <Route path="manage-tournaments" element={<ManageTournaments />} />
                    <Route path="tournament/:id" element={<TournamentView />} />
                    <Route path="manage-participants" element={<ManageParticipants />} />
                    <Route path="eternal-table" element={<EternalTable />} />
                    <Route path="characters" element={<Characters />} />
                    <Route path="settings" element={<Settings />} />
                    
                    {currentUser?.role === "superadmin" && (
                      <Route path="super-admin" element={<SuperAdmin />} />
                    )}

                    {/* Default fallback inside /admin */}
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </>
  );
}