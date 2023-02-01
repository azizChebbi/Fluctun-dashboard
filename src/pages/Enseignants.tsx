import Button from "@atoms/Button";
import { generateTeachers } from "@helpers/generateTables";
import TeachersModal from "@organisms/TeachersModal";
import TeachersTable from "@organisms/TeachersTable";
import { useState } from "react";

const Enseignants = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className=" h-full flex flex-col justify-center">
      <p className=" text-blue text-2xl font-semibold mb-6">Enseignants</p>
      <TeachersTable rows={generateTeachers()} />
      <Button className=" ml-auto mt-6" onClick={() => setOpen(true)}>
        Ajouter des enseignants
      </Button>
      <TeachersModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Enseignants;
