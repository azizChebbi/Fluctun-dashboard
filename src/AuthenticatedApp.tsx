import Cours from "@pages/Cours";
import Enseignants from "@pages/Enseignants";
import Etudiants from "@pages/Etudiants";
import Questions from "@pages/Questions";
import Statistiques from "@pages/Statistiques";
import { Routes, Route, Navigate } from "react-router-dom";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Statistiques />} />
      <Route path="/Etudiants" element={<Etudiants />} />
      <Route path="/enseignants" element={<Enseignants />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/cours" element={<Cours />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AuthenticatedApp;
