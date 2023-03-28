import Button from "@atoms/Button";
import { mapTeachersDataToColumns } from "@helpers/generateTables";
import { api } from "api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TeachersModal, Table } from "@features/teachers";
import { getTeachers } from "@features/teachers/api";
import { teachersColumns } from "@utils/columns";
import ClipLoader from "react-spinners/ClipLoader";

const Teachers = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, data } = useQuery("teachers", getTeachers);

  return (
    <div className=" h-full flex flex-col justify-center p-10">
      <p className=" text-blue text-2xl font-semibold mb-6">Enseignants</p>
      <Table
        rows={mapTeachersDataToColumns(data ? data.data : [])}
        columns={teachersColumns}
        noRowsIndicator={isLoading ? <ClipLoader color="#142B33" /> : "Aucun enseignant"}
      />
      <Button className=" ml-auto mt-6" onClick={() => setOpen(true)}>
        Ajouter des enseignants
      </Button>
      <TeachersModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Teachers;
