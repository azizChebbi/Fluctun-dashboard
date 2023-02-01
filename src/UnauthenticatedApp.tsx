import Login from "@pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
