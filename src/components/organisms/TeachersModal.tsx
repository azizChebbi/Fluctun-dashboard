import React, { Reducer, useEffect, useReducer } from "react";
import Modal from "@mui/material/Modal";
import TeachersForm from "@molecules/TeachersForm";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@atoms/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClipLoader from "react-spinners/ClipLoader";
import { Tooltip } from "@mui/material";
import {
  addTeachersInitialState,
  Action,
  addTeachersReducer,
  AddTeachersState,
  Teacher,
} from "@reducers/teachers";
import { useMutation } from "react-query";
import { api } from "api";
import { notifyError, notifySuccess } from "@utils/notify";

const fields = ["Nom", "Prénom", "Cin", "Matiére", "Email", "Numéro"];

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeachersModal: React.FC<IProps> = ({ open, setOpen }) => {
  const [data, setData] = React.useState<string[]>([]);
  const [counter, setCounter] = React.useState(0);
  const [state, dispatch] = useReducer<Reducer<AddTeachersState, Action>>(
    addTeachersReducer,
    addTeachersInitialState
  );
  console.log(state.teachers.length);
  console.log(state.teachers);

  const mutation = useMutation("create-teachers", () => {
    return api.post("/auth/register-teachers", state.teachers);
  });
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "DELETE_TEACHERS",
      payload: null as unknown as Teacher,
    });
    setCounter(0);
    setData([]);
  };

  const isAllFieldsAreValid = () => {
    const teachers = state.teachers;
    for (let i = 0; i < teachers.length; i++) {
      if (!teachers[i].isValid) return false;
    }
    return true;
  };

  const addForm = () => {
    setCounter(counter + 1);
  };

  const handleValidation = () => {
    mutation.mutate();
    const { data, isSuccess, isError } = mutation;
    console.log(mutation);
    if (isSuccess || data) {
      handleClose();
      notifySuccess("Les enseignants sont ajoutés avec succées");
    }
    if (isError) {
      notifyError(
        "Un erreur c'est produite, ca peut étre une duplication des emails ou des cin ou des champs invalides"
      );
      mutation.reset();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] bg-white py-12">
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
          {[...Array(counter).keys()].map((id) => (
            <div key={id} className=" relative">
              <TeachersForm
                setData={setData}
                setCounter={setCounter}
                state={state}
                dispatch={dispatch}
              />
            </div>
          ))}
          {data.length < 5 && (
            <button
              className=" text-[#D6D6D6] text-md font-semibold text-center  flex flex-col items-center justify-center m-auto mt-6"
              onClick={addForm}
            >
              <AddCircleOutlineOutlinedIcon sx={{ color: "#D6D6D6" }} />
              <span>Ajouter encore</span>
            </button>
          )}
          <div className=" w-max flex items-center justify-center gap-8 ml-auto mt-6 mr-16">
            {mutation.isLoading ? (
              <ClipLoader color="#142B33" />
            ) : (
              <Button
                className={`py-2 px-12 ${
                  isAllFieldsAreValid() ? "" : " bg-gray-400"
                }`}
                disabled={
                  !isAllFieldsAreValid() || state.teachers.length == 0
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

export default TeachersModal;
