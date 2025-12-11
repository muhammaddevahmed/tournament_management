import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./PublicLayout";
import ViewOnlyManageTournaments from "./ViewOnlyManageTournaments";
import ViewOnlyManageParticipants from "./ViewOnlyManageParticipants";
import ViewOnlyCharacters from "./ViewOnlyCharacters";
import EternalTable from "../pages/EternalTable";

const PublicApp = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route index element={<Navigate to="/manage-tournaments" />} />
        <Route path="/manage-tournaments" element={<ViewOnlyManageTournaments />} />
        <Route path="/manage-participants" element={<ViewOnlyManageParticipants />} />
        <Route path="/eternal-table" element={<EternalTable />} />
        <Route path="/characters" element={<ViewOnlyCharacters />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicApp;