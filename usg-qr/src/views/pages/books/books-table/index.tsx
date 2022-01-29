import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { TableRow as RowSkeleton } from "../../../../components/cards/skeleton/TableRow";
// import SearchBar from "material-ui-search-bar";
import SearchSection from "../../../../layouts/MainLayout/Header/SearchSection";
import BookModal from "../book-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { BOOKS } from "../../../../store/queryKeys";
import { getBooks } from "../../../../services/bookService";
import { useGetData } from "../../../../hooks/useGetData";
import { useQuery } from "react-query";
import { isInteger } from "formik";

const columns: any = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "isActive", label: "Status", minWidth: 100 },
  { id: "view", label: "View", minWidth: 100 },
];

export default function ServicesTable() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryPage: any = searchParams.get("page");
  const [page, setPage]: any = React.useState(
    isInteger(queryPage) ? parseInt(queryPage) : 0
  );
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(5);
  const { isLoading, data, isError, error, isFetching, refetch, status } =
    useQuery([BOOKS, page, rowsPerPage], () => getBooks(page, rowsPerPage));
  const navigate = useNavigate();
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  React.useEffect(() => {
    if (data?.headers["count"]) {
      setTotalCount(data?.headers["count"]);
    }
  }, [data]);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ vh: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <SearchSection />
              </TableCell>
              <TableCell align="right" colSpan={3}>
                <BookModal />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell key={column.id} style={{ top: 57, width: "100%" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? [...Array(rowsPerPage)].map((x, i) => {
                  return (
                    <TableRow>
                      {[...Array(3)].map((x, i) => (
                        <TableCell>
                          <RowSkeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              : data.data.map((row: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Typography
                          lineHeight={"normal"}
                          fontWeight={"bold"}
                          color={row.isActive ? "green" : "red"}
                          alignItems={"center"}
                          display={"flex"}
                        >
                          {row.isActive ? "Active" : "Not active"}
                          {row.isActive ? (
                            <CheckIcon
                              style={{
                                marginLeft: "0.1rem",
                                fontWeight: "lighter",
                              }}
                            />
                          ) : (
                            <CloseIcon
                              style={{
                                marginLeft: "0.1rem",
                                fontWeight: "lighter",
                              }}
                            />
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="contained"
                          color={"primary"}
                          onClick={() => navigate(`/books/${row.id}`)}
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
