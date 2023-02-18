import Cours from "@pages/Cours";
import Enseignants from "@pages/Teachers";
import Etudiants from "@pages/Students";
import Questions from "@pages/Questions";
import Statistiques from "@pages/Statistiques";
import { Navigate } from "react-router-dom";
import Login from "@pages/Login";

type Path =
  | "/"
  | "/etudiants"
  | "/enseignants"
  | "/questions"
  | "/cours"
  | "/login"
  | "*";
type Route = {
  path: Path;
  element: JSX.Element;
};

export const authenticatedRoutes: Route[] = [
  { path: "/", element: <Statistiques /> },
  { path: "/etudiants", element: <Etudiants /> },
  { path: "/enseignants", element: <Enseignants /> },
  { path: "/questions", element: <Questions /> },
  { path: "/cours", element: <Cours /> },
  { path: "*", element: <Navigate to="/" replace /> },
];

export const unauthenticatedRoutes: Route[] = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/login" replace /> },
];
