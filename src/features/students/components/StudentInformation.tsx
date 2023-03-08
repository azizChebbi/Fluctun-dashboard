import Button from "@atoms/Button";
import Loader from "@atoms/Loader";
import { FullStudentData, FullTeacherData } from "@helpers/generateTables";
import Profile from "@molecules/Profile";
import StaticInformation from "@molecules/StaticInformation";
import {
  Action,
  editStudentInitialState,
  editStudentReducer,
  EditStudentState,
} from "@reducers/editStudent";

import { Student } from "@reducers/students";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "context/Provider";
import { FC, ReactNode, useReducer, useState, Reducer } from "react";
import { useMutation, useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { getStudents, updateStudent as updateStudentMutation } from "../api";
import { EditStudentInformation } from "./EditStudentInformation";
import profileImg from "@images/profile.svg";

type Label = "Nom" | "Prénom" | "Code" | "Niveau" | "Email" | "Bio";

export type InfoLine = {
  label: Label;
  value: ReactNode;
};

interface IProps {
  id: string;
  handleClose: () => void;
}

export const StudentInformation: FC<IProps> = ({ id, handleClose }) => {
  //==================================================================
  // state
  //==================================================================
  const [student, setStudent] = useState<FullStudentData | null>(null);
  const [informations, setInformations] = useState<InfoLine[]>(() => {
    return [];
  });
  const [editMode, setEditMode] = useState(false);
  const [state, dispatch] = useReducer<Reducer<EditStudentState, Action>>(
    editStudentReducer,
    editStudentInitialState
  );

  //==================================================================
  // queries and mutations
  //==================================================================
  const { data } = useQuery("students", getStudents, {
    onSuccess: () => {
      const student: FullStudentData = data?.data.find(
        (t: FullStudentData) => t.id == id
      ) as FullStudentData;
      setStudent(student);
      setInformations(() => {
        const arr: InfoLine[] = [
          { label: "Nom", value: student.lastName },
          { label: "Prénom", value: student.firstName },
          { label: "Code", value: student.code },
          { label: "Niveau", value: student.level },
          { label: "Email", value: student.email },
        ];
        return arr;
      });
    },
    onError: () => {
      notifyError("Error has occured, try again");
    },
  });
  const updateStudent = useMutation(
    "updateStudent",
    () => {
      const { isValid, ...data } = state.student as Student;
      return updateStudentMutation({ ...data, id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students");
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
    updateStudent.mutate();
  };

  //======================================================
  // ui
  //======================================================
  return (
    <div className=" grid grid-cols-[300px_1fr] relative">
      <Profile
        editMode={editMode}
        url={student?.photo || profileImg}
        bio={student?.bio}
        nbQuestions={student?.questions.length}
        isTeacher={false}
      />
      <div className=" p-16">
        {editMode ? (
          <EditStudentInformation
            firstName={getValueFromInformationsByLabel("Prénom") as string}
            lastName={getValueFromInformationsByLabel("Nom") as string}
            code={getValueFromInformationsByLabel("Code") as string}
            email={getValueFromInformationsByLabel("Email") as string}
            level={getValueFromInformationsByLabel("Niveau") as string}
            state={state}
            dispatch={dispatch}
          />
        ) : (
          <StaticInformation informations={informations} />
        )}
        <div className=" flex gap-2 absolute bottom-8 right-8">
          {editMode ? (
            <Loader
              isLoading={updateStudent.isLoading}
              loader={<ClipLoader color="#142B33" />}
            >
              <Button onClick={handleUpdate} disabled={!state.student?.isValid}>
                Enregistrer
              </Button>
            </Loader>
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
