import Login from "@pages/Login";
import { Routes, Route } from "react-router-dom";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
