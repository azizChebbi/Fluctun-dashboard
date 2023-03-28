import cours from "@icons/tabs/cours.svg";
import statistiques from "@icons/tabs/statistiques.svg";
import enseignants from "@icons/tabs/enseignants.svg";
import etudiants from "@icons/tabs/etudiants.svg";
import questions from "@icons/tabs/questions.svg";

interface Tab {
  label: string;
  href: string;
  svg: string;
}

export const tabs: Tab[] = [
  {
    label: "Statistiques",
    href: "/",
    svg: statistiques,
  },
  {
    label: "Enseignants",
    href: "/enseignants",
    svg: enseignants,
  },
  {
    label: "Etudiants",
    href: "/etudiants",
    svg: etudiants,
  },
  {
    label: "Questions",
    href: "/questions",
    svg: questions,
  },
  // {
  //   label: "Cours",
  //   href: "/cours",
  //   svg: cours,
  // },
];
