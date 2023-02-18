import React, { Reducer, useEffect, useReducer } from "react";
import Modal from "@mui/material/Modal";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@atoms/Button";
import ClipLoader from "react-spinners/ClipLoader";
import {
  addTeachersInitialState,
  Action,
  addTeachersReducer,
  AddTeachersState,
  Teacher,
} from "@reducers/teachers";
import { useMutation } from "react-query";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "context/Provider";
import { nanoid } from "nanoid";
import { TeachersForm } from "./TeachersForm";
import { registerTeachers } from "../api";
import AddMoreButton from "@atoms/AddMoreButton";
import Loader from "@atoms/Loader";
import { isAllFormsAreValid } from "@utils/isAllFormsAreValid";

const fields = ["Nom", "Prénom", "Cin", "Matiére", "Email", "Numéro"];

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TeachersModal: React.FC<IProps> = ({ open, setOpen }) => {
  // ===================================================================
  // state
  // ===================================================================

  const [teachersIDS, setTeachersIDS] = React.useState<string[]>([]);
  const [state, dispatch] = useReducer<Reducer<AddTeachersState, Action>>(
    addTeachersReducer,
    addTeachersInitialState
  );

  // ===================================================================
  // effect
  // ===================================================================

  useEffect(() => {
    dispatch({
      type: "REMAIN_TEACHERS_WITH_IDS",
      payload: {
        teachersIDS,
      },
    });
  }, [teachersIDS]);

  // ===================================================================
  // queries and mutations
  // ===================================================================

  const createTeachers = useMutation(
    "create-teachers",
    () => registerTeachers(state.teachers),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["teachers"]);
        handleClose();
        notifySuccess("Les enseignants sont ajoutés avec succées");
      },
      onError: () => {
        notifyError(
          "Un erreur c'est produite, ca peut étre une duplication des emails ou des cin ou des champs invalides"
        );
      },
    }
  );

  // ===================================================================
  // handlers
  // ===================================================================

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "DELETE_TEACHERS",
      payload: null as unknown as Teacher,
    });
    setTeachersIDS([]);
  };

  const addForm = () => {
    const newId = nanoid();
    setTeachersIDS((prev) => [...prev, newId]);
  };

  const handleValidation = () => {
    createTeachers.mutate();
  };

  // ===================================================================
  // ui
  // ===================================================================

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
          {teachersIDS.map((id) => (
            <div key={id} className=" relative">
              <TeachersForm
                id={id}
                setTeachersIDS={setTeachersIDS}
                state={state}
                dispatch={dispatch}
              />
            </div>
          ))}
          {teachersIDS.length < 5 && <AddMoreButton handleClick={addForm} />}
          <div className=" w-max flex items-center justify-center gap-8 ml-auto mt-6 mr-16">
            <Loader
              isLoading={createTeachers.isLoading}
              loader={<ClipLoader color="#142B33" />}
            >
              <Button
                className={`py-2 px-12 ${
                  isAllFormsAreValid(state.teachers) ? "" : " bg-gray-400"
                }`}
                disabled={
                  !isAllFormsAreValid(state.teachers) ||
                  state.teachers.length == 0
                    ? true
                    : false
                }
                onClick={handleValidation}
              >
                Valider
              </Button>
            </Loader>
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
