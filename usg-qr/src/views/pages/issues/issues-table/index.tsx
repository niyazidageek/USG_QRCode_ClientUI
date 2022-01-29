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
// import SearchBar from "material-ui-search-bar";
import SearchSection from "../../../../layouts/MainLayout/Header/SearchSection";
import IssueModal from "../issue-modal";

const columns: any = [
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "isActive", label: "Status", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "edit", label: "Edit", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 100 },
];

function createData(name: any, isActive: any, date:any) {
  return { name, isActive, date };
}


const rows = [
  createData("Issue about someone", "Active", "12 January"),
  createData("Issue about her", "Not active", "24 January"),
];

export default function IssuesTable() {
  const [page, setPage]: any = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(10);
  const [searched, setSearched] = React.useState<string>("");

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
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
              <TableCell colSpan={3}>
                <SearchSection />
              </TableCell>
              <TableCell align='right' colSpan={3}>
              <IssueModal />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.isActive}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={"warning"}
                        style={{ color: "white", fontWeight: "bold" }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="contained"
                        color={'error'}
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
