import { api } from "api";
import React, { useState } from "react";
import { useQuery } from "react-query";
import CountCard from "./CountCard";

const Counts = () => {
  const [counts, setCounts] = useState([
    {
      day: 0,
      week: 0,
      month: 0,
    },
    {
      day: 0,
      week: 0,
      month: 0,
    },
  ]);
  useQuery("count", () => api.get("/questions/count"), {
    onSuccess: (data) => {
      console.log(data.data);
      setCounts(data.data);
    },
  });

  return (
    <div className=" flex items-center gap-6 w-full">
      <CountCard type="question" {...counts[0]} />
      <CountCard type="answer" {...counts[1]} />
    </div>
  );
};

export default Counts;
