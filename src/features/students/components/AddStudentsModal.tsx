import React, { Reducer, useEffect, useReducer } from "react";
import Modal from "@mui/material/Modal";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@atoms/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { Teacher } from "@reducers/teachers";
import { useMutation } from "react-query";
import { api } from "api";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "context/Provider";
import { nanoid } from "nanoid";
import StudentsForm from "features/students/components/StudentsForm";
import {
  Action,
  addStudentsInitialState,
  addStudentsReducer,
  AddStudentsState,
} from "@reducers/students";
import AddMoreButton from "@atoms/AddMoreButton";

const fields = ["Nom", "Prénom", "Code d'inscription", "Niveau"];

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddStudentsModal: React.FC<IProps> = ({ open, setOpen }) => {
  const [studentsIDS, setStudentsIDS] = React.useState<string[]>([]);
  const [state, dispatch] = useReducer<Reducer<AddStudentsState, Action>>(
    addStudentsReducer,
    addStudentsInitialState
  );

  useEffect(() => {
    dispatch({
      type: "REMAIN_STUDENTS_WITH_IDS",
      payload: {
        studentsIDS,
      },
    });
  }, [studentsIDS]);

  const createStudents = useMutation(
    "create-students",
    () => api.post("/auth/register-students", state.students),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
        handleClose();
        notifySuccess("Les etudiants sont ajoutés avec succées");
      },
      onError: () => {
        notifyError(
          "Un erreur c'est produite, ca peut étre une duplication des emails ou des cin ou des champs invalides"
        );
      },
    }
  );
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "DELETE_STUDENTS",
      payload: null as unknown as Teacher,
    });
    setStudentsIDS([]);
  };

  const isAllFieldsAreValid = () => {
    const students = state.students;
    for (let i = 0; i < students.length; i++) {
      if (!students[i].isValid) return false;
    }
    return true;
  };

  const addForm = () => {
    const newId = nanoid();
    setStudentsIDS((prev) => [...prev, newId]);
  };

  const handleValidation = () => {
    createStudents.mutate();
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] bg-white py-12">
          <div className=" flex items-center justify-between px-24 gap-8 p-4 w-full mb-8">
            {fields.map((field, index) => (
              <p
                key={index}
                className=" text-[#8E8E8E] text-xl font-semibold  flex-1"
              >
                {field}
              </p>
            ))}
          </div>
          {studentsIDS.map((id) => (
            <div key={id} className=" relative">
              <StudentsForm
                id={id}
                setStudentsIDS={setStudentsIDS}
                state={state}
                dispatch={dispatch}
              />
            </div>
          ))}
          {studentsIDS.length < 5 && <AddMoreButton handleClick={addForm} />}
          <div className=" w-max flex items-center justify-center gap-8 ml-auto mt-6 mr-16">
            {createStudents.isLoading ? (
              <ClipLoader color="#142B33" />
            ) : (
              <Button
                className={`py-2 px-12 ${
                  isAllFieldsAreValid() ? "" : " bg-gray-400"
                }`}
                disabled={
                  !isAllFieldsAreValid() || state.students.length == 0
                    ? true
                    : false
                }
                onClick={handleValidation}
              >
                Valider
              </Button>
            )}
            <button
              className=" text-blue font-semibold underline underline-offset-1"
              onClick={handleClose}
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddStudentsModal;
