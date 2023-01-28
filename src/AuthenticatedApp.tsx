import Etudiants from "@pages/Etudiants";
import { Routes, Route } from "react-router-dom";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Etudiants />} />
      <Route path="/enseignants" element={null} />
      <Route path="/questions" element={null} />
      <Route path="/cours" element={null} />
    </Routes>
  );
};

export default AuthenticatedApp;
