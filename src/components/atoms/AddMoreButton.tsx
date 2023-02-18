import { FC } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

interface IProps {
  handleClick: () => void;
}

const AddMoreButton: FC<IProps> = ({ handleClick }) => {
  return (
    <button
      className=" text-[#D6D6D6] text-md font-semibold text-center  flex flex-col items-center justify-center m-auto mt-6"
      onClick={handleClick}
    >
      <AddCircleOutlineOutlinedIcon sx={{ color: "#D6D6D6" }} />
      <span>Ajouter encore</span>
    </button>
  );
};

export default AddMoreButton;
