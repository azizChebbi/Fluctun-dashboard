import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import profileImg from "@images/profile.svg";
import { styled } from "@mui/material/styles";
import { TopTeacher } from "@pages/Statistiques";

function Teacher({ name, photo }: { name: string; photo: string }) {
  return (
    <div className=" flex items-center gap-4 ">
      <img src={photo || profileImg} className=" w-8" />
      <p>{name}</p>
    </div>
  );
}

interface IProps {
  teachers: TopTeacher[];
}

const RankedTeachers: React.FC<IProps> = ({ teachers }) => {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      color: "#8E8E8E",
      fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
      color: "#142B33",
      fontSize: 12,
    },
  }));
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderWidth: "1px", borderColor: "#E2E2E2" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Rang</StyledTableCell>
            <StyledTableCell align="center">Enseignant</StyledTableCell>
            <StyledTableCell align="center">Matiére</StyledTableCell>
            <StyledTableCell align="center">Les réponses</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((row, index) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <StyledTableCell component="th" scope="row" align="center">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Teacher name={row.firstName + " " + row.lastName} photo={row.photo} />
              </StyledTableCell>
              <StyledTableCell align="center">{row.subject}</StyledTableCell>
              <StyledTableCell align="center">{row.nbQuestions}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankedTeachers;
