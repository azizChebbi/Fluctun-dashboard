import { InfoLine } from "@organisms/TeacherInformation";
import React, { FC } from "react";

interface IProps {
  informations: InfoLine[];
}

const StaticInformation: FC<IProps> = ({ informations }) => {
  return (
    <div className=" mt-16">
      {informations.map((info, index) => (
        <div key={index} className=" flex mb-8">
          <p className=" text-blue text-base font-medium w-48">
            {info.label + " :"}
          </p>
          <p className=" text-text text-base">{info.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StaticInformation;
