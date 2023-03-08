import { Dispatch, FC, SetStateAction, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "api";
import { queryClient } from "context/Provider";
import Modal from "@mui/material/Modal";
import Button from "../../../components/atoms/Button";
import { FullStudentData, FullTeacherData } from "@helpers/generateTables";
import { notifyError, notifySuccess } from "@utils/notify";
import ClipLoader from "react-spinners/ClipLoader";
import { TeacherInformation } from "@features/teachers";
import ActionCell from "@atoms/ActionCell";
import { StudentInformation } from "./StudentInformation";

interface IProps {
  id: string;
  onEditClick?: Dispatch<SetStateAction<boolean>>;
}

const StudentActionCell: FC<IProps> = ({ id }) => {
  //======================================================
  // state
  //======================================================
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [student, setStudent] = useState<FullStudentData | null>(null);

  //======================================================
  // queries and mutations
  //======================================================
  const { data } = useQuery("students", () => api.get("/admin/students"), {
    onSuccess: () => {
      setStudent(() => {
        return data?.data.find((t: FullStudentData) => t.id == id);
      });
    },
  });
  const deleteStudent = useMutation(
    "delete-student",
    () => api.delete(`/admin/student?id=${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students");
        notifySuccess("student is deleted successfully");
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
    deleteStudent.mutate();
  };
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
            student?.firstName + " " + student?.lastName
          } avec cin ${student?.code}?`}</p>
          <div className=" flex gap-4">
            {deleteStudent.isLoading ? (
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
          <StudentInformation id={id} handleClose={handleEditModalClose} />
        </div>
      </Modal>
    </div>
  );
};

export default StudentActionCell;
