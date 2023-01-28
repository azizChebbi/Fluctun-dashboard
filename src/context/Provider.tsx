import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";

interface IProps {
  children?: React.ReactNode;
}

const AppProviders: React.FC<IProps> = ({ children }) => {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
};

export { AppProviders };
