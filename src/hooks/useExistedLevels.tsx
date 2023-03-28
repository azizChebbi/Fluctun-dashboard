import { useState } from "react";
import { useQuery } from "react-query";
import { level } from "@utils/options";
import { api } from "api";

const useExistedLevels = () => {
  const [levels, setLevels] = useState<level[]>([]);
  useQuery("levels", () => api.get("/documents/levels"), {
    onSuccess: (data) => {
      setLevels(data.data);
    },
  });
  return levels;
};

export default useExistedLevels;
