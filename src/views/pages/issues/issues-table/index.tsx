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
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Button from "@mui/material/Button";
import { TableRow as RowSkeleton } from "../../../../components/cards/skeleton/TableRow";
import Typography from "@mui/material/Typography";
import SearchSection from "../issues-search";
import IssueModal from "../issue-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { isInteger } from "formik";
import { ISSUES } from "../../../../store/queryKeys";
import { useQuery } from "react-query";
import { getIssues } from "../../../../services/issueService";
import { useSelector } from "react-redux";

const columns: any = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "isActive", label: "Status", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "view", label: "View", minWidth: 100 },
];

export default function IssuesTable() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryPage: any = searchParams.get("page");
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const navigate = useNavigate();
  const [page, setPage]: any = React.useState(
    isInteger(queryPage) ? parseInt(queryPage) : 0
  );
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(5);

  const { isLoading, data, isError, error, isFetching, refetch, status } =
    useQuery([ISSUES, page, rowsPerPage], () => getIssues(page, rowsPerPage, jwt));

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (data?.headers["count"]) {
      setTotalCount(data?.headers["count"]);
    }
  }, [data]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer  sx={{ vh: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <SearchSection />
              </TableCell>
              <TableCell align="right" colSpan={3}>
                <IssueModal />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column: any, id:any) => (
                <TableCell
                  key={column.id}
                  align={id!==0?'right':'left'}
                  style={{ top: 57 }}
                >
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
                      {[...Array(4)].map((x, i) => (
                        <TableCell  align={i!==0?'right':'left'}>
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
                      <TableCell align="right">
                        <Typography
                          lineHeight={"normal"}
                          fontWeight={"bold"}
                          color={row.isActive ? "green" : "red"}
                          alignItems={"center"}
                          display={"flex"}
                          justifyContent={'flex-end'}
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
                      <TableCell align="right">
                        {moment.utc(row.date).local().format("MM/DD/yyyy HH:mm")}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Button
                          variant="contained"
                          color={"primary"}
                          onClick={() => navigate(`/issues/${row.id}`)}
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
