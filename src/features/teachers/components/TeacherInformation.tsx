import Button from "@atoms/Button";
import { FullTeacherData } from "@helpers/generateTables";
import StaticInformation from "@molecules/StaticInformation";
import {
  Action,
  editTeacherInitialState,
  editTeacherReducer,
  EditTeacherState,
  Teacher,
} from "@reducers/editTeacher";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "context/Provider";
import { FC, ReactNode, useReducer, useState, Reducer } from "react";
import { useMutation, useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { getTeachers, updateTeacher as updateTeacherMutation } from "../api";
import { EditTeacherInformation } from "./EditTeacherInformation";

type Label = "Nom" | "Prénom" | "CIN" | "Matiére" | "Numéro" | "Email" | "Bio";

export type InfoLine = {
  label: Label;
  value: ReactNode;
};

interface IProps {
  id: string;
  handleClose: () => void;
}

export const TeacherInformation: FC<IProps> = ({ id, handleClose }) => {
  //==================================================================
  // state
  //==================================================================

  const [informations, setInformations] = useState<InfoLine[]>(() => {
    return [];
  });
  const [editMode, setEditMode] = useState(false);
  const [state, dispatch] = useReducer<Reducer<EditTeacherState, Action>>(
    editTeacherReducer,
    editTeacherInitialState
  );

  //==================================================================
  // queries and mutations
  //==================================================================
  const { data } = useQuery("teachers", getTeachers, {
    onSuccess: () => {
      const teacher: FullTeacherData = data?.data.find(
        (t: FullTeacherData) => t.id == id
      ) as FullTeacherData;
      setInformations(() => {
        const arr: InfoLine[] = [
          { label: "Nom", value: teacher.lastName },
          { label: "Prénom", value: teacher.firstName },
          { label: "CIN", value: teacher.cin },
          { label: "Matiére", value: teacher.subject },
          { label: "Numéro", value: teacher.number },
          { label: "Email", value: teacher.email },
          { label: "Bio", value: teacher.bio },
        ];
        return arr;
      });
    },
    onError: () => {
      notifyError("Error has occured, try again");
    },
  });
  const updateTeacher = useMutation(
    "updateTeacher",
    () => {
      const { isValid, ...data } = state.teacher as Teacher;
      return updateTeacherMutation({ ...data, id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("teachers");
        notifySuccess("L'enseignant est modifié avec succées");
        handleClose();
      },
      onError: () => {
        notifyError("Un erreur est produit");
      },
    }
  );

  //==================================================================
  // handlers
  //==================================================================

  const getValueFromInformationsByLabel = (label: Label) => {
    const infoLine: InfoLine | undefined = informations.find(
      (i: InfoLine) => i.label == label
    );
    if (infoLine != undefined) return infoLine.value;
    else
      return "Lorem ipsum dolor sit amet consectetur. Potenti arcu vel praesent ac rhoncus. Rhoncus ut semper amet amet. Sed molestie vestibulum urna varius amet tellus. Sit viverra viverra sed dolor penatibus maecenas elementum.";
  };
  const handleUpdate = () => {
    updateTeacher.mutate();
  };

  //======================================================
  // ui
  //======================================================
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
          {getValueFromInformationsByLabel("Bio")}
        </p>
        <div className=" mt-10">
          <p className=" text-blue font-medium mb-2">
            Nombre totale de réponses :
          </p>
          <p className=" text-blue text-sm">4 reponses </p>
        </div>
      </div>
      <div className=" p-16">
        {editMode ? (
          <EditTeacherInformation
            firstName={getValueFromInformationsByLabel("Prénom") as string}
            lastName={getValueFromInformationsByLabel("Nom") as string}
            cin={getValueFromInformationsByLabel("CIN") as string}
            email={getValueFromInformationsByLabel("Email") as string}
            subject={getValueFromInformationsByLabel("Matiére") as string}
            number={getValueFromInformationsByLabel("Numéro") as number}
            state={state}
            dispatch={dispatch}
          />
        ) : (
          <StaticInformation informations={informations} />
        )}
        <div className=" flex gap-2 absolute bottom-8 right-8">
          {editMode ? (
            !updateTeacher.isLoading ? (
              <Button onClick={handleUpdate} disabled={!state.teacher?.isValid}>
                Enregistrer
              </Button>
            ) : (
              <ClipLoader color="#142B33" />
            )
          ) : (
            <Button onClick={() => setEditMode(true)}>Editer</Button>
          )}
          <Button outlined onClick={handleClose}>
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};

// export default TeacherInformation;
