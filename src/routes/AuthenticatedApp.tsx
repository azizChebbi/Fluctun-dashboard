import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import FallbackScreen from "@pages/FallbackScreen";
import { authenticatedRoutes } from "./routes";

const AuthenticatedApp = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackScreen}>
      <Routes>
        {authenticatedRoutes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </ErrorBoundary>
  );
};

export default AuthenticatedApp;
