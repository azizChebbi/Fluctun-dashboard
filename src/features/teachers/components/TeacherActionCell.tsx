import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "context/Provider";
import Modal from "@mui/material/Modal";
import Button from "../../../components/atoms/Button";
import { FullTeacherData } from "@helpers/generateTables";
import { notifyError, notifySuccess } from "@utils/notify";
import ClipLoader from "react-spinners/ClipLoader";
import { TeacherInformation } from "./TeacherInformation";
import { deleteTeacher as deleteTeacherMutation, getTeachers } from "../api";
import ActionCell from "@atoms/ActionCell";

interface IProps {
  id: string;
  onEditClick?: Dispatch<SetStateAction<boolean>>;
}

export const TeacherActionCell: FC<IProps> = ({ id }) => {
  //======================================================
  // state
  //======================================================
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [teacher, setTeacher] = useState<FullTeacherData | null>(null);

  //======================================================
  // queries and mutations
  //======================================================
  const { isLoading, isError, data, error } = useQuery(
    "teachers",
    getTeachers,
    {
      onSuccess: () => {
        setTeacher(() => {
          return data?.data.find((t: FullTeacherData) => t.id == id) || null;
        });
      },
    }
  );

  const deleteTeacher = useMutation(
    "delete-teacher",
    () => deleteTeacherMutation(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("teachers");
        notifySuccess("teacher is deleted successfully");
      },
      onError: () => {
        notifyError("Error has occured, try later");
      },
    }
  );

  //======================================================
  // handlers
  //======================================================
  const handleDeleteModalClose = () => {
    setDeleteModalIsOpen(false);
  };
  const handleDeleteModalOpen = () => {
    setDeleteModalIsOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalIsOpen(false);
  };
  const handleEditModalOpen = () => {
    setEditModalIsOpen(true);
  };
  const handleDelete = () => {
    deleteTeacher.mutate();
  };

  //======================================================
  // ui
  //======================================================
  return (
    <div className=" flex items-center justify-center gap-4">
      <ActionCell
        handleDelete={handleDeleteModalOpen}
        handleEdit={handleEditModalOpen}
      />
      <Modal
        open={deleteModalIsOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded">
          <p className=" text-xl font-medium mb-4">{`Etes-vous sûr de supprimer l'enseignant ${
            teacher?.firstName + " " + teacher?.lastName
          } avec cin ${teacher?.cin}?`}</p>
          <div className=" flex gap-4">
            {deleteTeacher.isLoading ? (
              <ClipLoader color="#EF4444" />
            ) : (
              <Button color="#EF4444" onClick={handleDelete}>
                Supprimer
              </Button>
            )}
            <Button color="#EF4444" outlined onClick={handleDeleteModalClose}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={editModalIsOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[65%] rounded">
          <TeacherInformation id={id} handleClose={handleEditModalClose} />
        </div>
      </Modal>
    </div>
  );
};
