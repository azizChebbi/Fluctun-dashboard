import Button from "@atoms/Button";
import { FullTeacherData } from "@helpers/generateTables";
import EditTeacherInformation from "@molecules/EditTeacherInformation";
import StaticInformation from "@molecules/StaticInformation";
import { api } from "api";
import React, { FC, ReactNode, useState } from "react";
import { useQuery } from "react-query";

export type InfoLine = {
  label: string;
  value: ReactNode;
};

interface IProps {
  id: string;
}

const TeacherInformation: FC<IProps> = ({ id }) => {
  const [informations, setInformations] = useState<InfoLine[]>(() => {
    return [];
  });
  const [editMode, setEditMode] = useState(false);
  const { data } = useQuery("teachers", () => api.get("/admin/teachers"), {
    onSuccess: () => {
      const teacher: FullTeacherData = data?.data.find(
        (t: FullTeacherData) => t.id == id
      );
      setInformations(() => {
        const arr: InfoLine[] = [
          { label: "Nom", value: teacher.lastName },
          { label: "Prénom", value: teacher.firstName },
          { label: "CIN", value: teacher.cin },
          { label: "Matiére", value: teacher.subject },
          { label: "Numéro", value: teacher.number },
          { label: "Email", value: teacher.email },
        ];
        return arr;
      });
    },
  });

  return (
    <div className=" grid grid-cols-[300px_1fr] relative">
      <div className=" relative border-r-2 border-[#F2F2F2] p-8 py-16">
        <div
          className={` ${
            editMode ? "block" : "hidden"
          } absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.6)]`}
        ></div>
        <div className=" rounded-[50%] w-max overflow-hidden m-auto mb-10">
          <img
            src="https://content.fortune.com/wp-content/uploads/2023/02/GettyImages-1229894905-e1676063484430.jpg"
            className=" w-60 h-60 object-cover"
            alt="teacher"
          />
        </div>
        <p className=" text-base text-text leading-6">
          Lorem ipsum dolor sit amet consectetur. Potenti arcu vel praesent ac
          rhoncus. Rhoncus ut semper amet amet. Sed molestie vestibulum urna
          varius amet tellus. Sit viverra viverra sed dolor penatibus maecenas
          elementum.
        </p>
        <div className=" mt-10">
          <p className=" text-blue font-medium mb-2">
            Nombre totale de questions :
          </p>
          <p className=" text-blue text-sm">4 reponses </p>
        </div>
      </div>
      <div className=" p-16">
        {editMode ? (
          <EditTeacherInformation />
        ) : (
          <StaticInformation informations={informations} />
        )}
        <div className=" flex gap-2 absolute bottom-16 right-8">
          {editMode ? (
            <Button onClick={() => setEditMode(false)}>Enregistrer</Button>
          ) : (
            <Button onClick={() => setEditMode(true)}>Editer</Button>
          )}
          <Button outlined>Annuler</Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherInformation;
