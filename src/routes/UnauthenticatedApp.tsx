import { Routes, Route } from "react-router-dom";
import { unauthenticatedRoutes } from "./routes";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      {unauthenticatedRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

export default UnauthenticatedApp;
