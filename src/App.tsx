import AuthenticatedApp from "AuthenticatedApp";
import { useAuth, Auth } from "context/auth-context";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnauthenticatedApp from "UnauthenticatedApp";
import Etudiants from "./pages/Etudiants";
import Login from "./pages/Login";

function App() {
  const { data } = useAuth() as unknown as Auth;
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Etudiants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enseignants" element={null} />
        <Route path="/questions" element={null} />
        <Route path="/cours" element={null} />
      </Routes> */}
      {data ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
