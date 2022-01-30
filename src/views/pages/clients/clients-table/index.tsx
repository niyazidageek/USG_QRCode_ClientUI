import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import SearchSection from "../../../../layouts/MainLayout/Header/SearchSection";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IssueSearch from "../search-bars/IssueSearch";

const columns: any = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "email", label: "E-mail", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 100 },
];

function createData(id: any, email: any) {
  return { id, email };
}

const originalRows = [
  createData(12, "memmed@mail.ru"),
  createData(34, "iskender@mail.ru"),
];

export default function ClientsTable() {
  const [page, setPage]: any = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(10);
  const [rows, setRows] = React.useState(originalRows);
  const [searched, setSearched] = React.useState<string>("");

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.email.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                <SearchSection />
              </TableCell>
              <TableCell colSpan={4} align="right">
                <IssueSearch />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  colSpan={4}
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, width: "100%" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell colSpan={3}>{row.id}</TableCell>
                  <TableCell colSpan={4}>{row.email}</TableCell>
                  <TableCell colSpan={4}>
                    <Button
                      variant="contained"
                      color={"error"}
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
