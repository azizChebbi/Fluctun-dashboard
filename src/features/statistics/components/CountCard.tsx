import React, { FC } from "react";

interface IProps {
  type: "question" | "answer";
  day: number;
  week: number;
  month: number;
}

const CountCard: FC<IProps> = ({ type, day, week, month }) => {
  const typeLabel = type === "question" ? "Questions" : "Réponses";
  const dayLabel = type == "question" ? "Total des questions aujourd'hui" : "Total des réponses aujourd'hui";
  const weekLabel = type == "question" ? "Total des questions cette semaine" : "Total des réponses cette semaine";
  const monthLabel = type == "question" ? "Total des questions ce mois" : "Total des réponses ce mois";

  return (
    <div className=" bg-white border border-[#E2E2E2] p-8 px-10 rounded">
      <p className=" text-[#EF6965] text-3xl mb-8 ml-2">{typeLabel}</p>
      <div>
        <p className=" flex items-center gap-4 text-[#8E8E8E] my-4 text-2xl">
          {`${dayLabel}: `}
          <span className=" text-[#6EC95D] font-semibold">{day}</span>
        </p>
        <p className=" flex items-center gap-4 text-[#8E8E8E] my-4 text-2xl">
          {`${weekLabel}: `}
          <span className=" text-[#6EC95D] font-semibold">{week}</span>
        </p>
        <p className=" flex items-center gap-4 text-[#8E8E8E] my-4 text-2xl">
          {`${monthLabel}: `}
          <span className=" text-[#6EC95D] font-semibold">{month}</span>
        </p>
      </div>
    </div>
  );
};

export default CountCard;
