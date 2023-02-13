import Button from "@atoms/Button";
import { mapTeachersDataToColumns } from "@helpers/generateTables";
import TeachersModal from "@organisms/TeachersModal";
import TeachersTable from "@organisms/TeachersTable";
import { api } from "api";
import { useState } from "react";
import { useQuery } from "react-query";

const Enseignants = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, isError, data, error } = useQuery("teachers", () =>
    api.get("/admin/teachers")
  );
  return (
    <div className=" h-full flex flex-col justify-center">
      <p className=" text-blue text-2xl font-semibold mb-6">Enseignants</p>
      <TeachersTable rows={mapTeachersDataToColumns(data ? data.data : [])} />
      <Button className=" ml-auto mt-6" onClick={() => setOpen(true)}>
        Ajouter des enseignants
      </Button>
      <TeachersModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Enseignants;
