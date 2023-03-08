import Button from "@atoms/Button";
import { mapStudentsDataToColumns } from "@helpers/generateTables";
import { notifyError } from "@utils/notify";
import { api } from "api";
import { useState } from "react";
import { useQuery } from "react-query";
import AddStudentsModal from "@features/students/components/AddStudentsModal";
import { Table } from "@organisms/Table";
import { studentsColumns } from "@utils/columns";
import ClipLoader from "react-spinners/ClipLoader";

const Students = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, isError, data, error } = useQuery(
    "students",
    () => api.get("/admin/students"),
    {
      onError: () => {
        notifyError("Un erreur est produit");
      },
    }
  );
  return (
    <div className=" h-full flex flex-col justify-center">
      <p className=" text-blue text-2xl font-semibold mb-6">Etudiants</p>
      <Table
        rows={mapStudentsDataToColumns(data ? data.data : [])}
        columns={studentsColumns}
        noRowsIndicator={
          isLoading ? <ClipLoader color="#142B33" /> : "Aucun étudiant"
        }
      />
      <Button className=" ml-auto mt-6" onClick={() => setOpen(true)}>
        Ajouter des etudiants
      </Button>
      <AddStudentsModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Students;
