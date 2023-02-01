import * as React from "react";
import Modal from "@mui/material/Modal";
import TeachersForm from "@molecules/TeachersForm";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@atoms/Button";

const fields = ["Nom", "Prénom", "Cin", "Matiére", "Email", "Numéro"];

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeachersModal: React.FC<IProps> = ({ open, setOpen }) => {
  const [data, setData] = React.useState<number[]>([]);
  const [counter, setCounter] = React.useState(0);
  const handleClose = () => setOpen(false);

  const addForm = () => {
    setData((prev) => [...prev, counter]);
    setCounter(counter + 1);
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
          {data.map((id) => (
            <TeachersForm id={id} setData={setData} key={id} />
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
            <Button className=" py-2 px-12">Valider</Button>
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
