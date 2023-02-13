import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQuery } from "react-query";
import { api } from "api";
import { queryClient } from "context/Provider";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import { FullTeacherData } from "@helpers/generateTables";
import { notifyError, notifySuccess } from "@utils/notify";
import ClipLoader from "react-spinners/ClipLoader";
import TeacherInformation from "@organisms/TeacherInformation";

interface IProps {
  id: string;
  onEditClick?: Dispatch<SetStateAction<boolean>>;
}

const TeacherActionCell: FC<IProps> = ({ id }) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [teacher, setTeacher] = useState<FullTeacherData | null>(null);
  const { isLoading, isError, data, error } = useQuery(
    "teachers",
    () => api.get("/admin/teachers"),
    {
      onSuccess: () => {
        setTeacher(() => {
          return data?.data.find((t: FullTeacherData) => t.id == id);
        });
      },
    }
  );
  const deleteTeacher = useMutation(
    "delete-teacher",
    () => api.delete(`/admin/teacher?id=${id}`),
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
  useEffect(() => {
    console.log(id);
  }, []);

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
  return (
    <div className=" flex items-center justify-center gap-2">
      <Tooltip title="delete">
        <button onClick={handleDeleteModalOpen}>
          <DeleteOutlineOutlinedIcon
            sx={{ color: "#8E8E8E", cursor: "pointer" }}
          />
        </button>
      </Tooltip>
      <Tooltip title="Edit">
        <button onClick={handleEditModalOpen}>
          <ModeEditOutlinedIcon sx={{ color: "#8E8E8E", cursor: "pointer" }} />
        </button>
      </Tooltip>
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
          <TeacherInformation id={id} />
        </div>
      </Modal>
    </div>
  );
};

export default TeacherActionCell;
