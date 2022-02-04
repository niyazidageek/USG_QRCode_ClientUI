import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { TableRow as RowSkeleton } from "../../../../components/cards/skeleton/TableRow";
import IssuesSearch from "../issues-search";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { isInteger } from "formik";
import { SCANS } from "../../../../store/queryKeys";
import { useQuery } from "react-query";
import { getScans } from "../../../../services/scanService";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const columns: any = [
  { id: "deviceType", label: "Device", minWidth: 170 },
  { id: "date", label: "Scan Date", minWidth: 100 },
  { id: "view", label: "View", minWidth: 100 },
];

export default function ScansTable() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryPage: any = searchParams.get("page");
  const alert = useAlert()
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const navigate = useNavigate();
  const [page, setPage]: any = React.useState(
    isInteger(queryPage) ? parseInt(queryPage) : 0
  );
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(5);
  const [selectedIssue, setSelectedIssue] = React.useState(null);

  const { isLoading, data, isError, error, isFetching, refetch, status }:any =
    useQuery([SCANS, page, rowsPerPage, selectedIssue], () =>
      getScans(page, rowsPerPage, selectedIssue, jwt)
    );

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

  if(error){
    alert.show(error.response.data.message, {type:'error'})
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ vh: "100%" }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <Box alignItems={"center"} display={"flex"}>
                  <Typography
                    marginRight={"1rem"}
                    fontSize={"1rem"}
                    fontWeight={"bold"}
                  >
                    Sort by issue:
                  </Typography>
                  <IssuesSearch setSelectedIssue={setSelectedIssue} />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column: any, i:any) => (
                <TableCell
                  key={column.id}
                  align={i!=0?'right':'left'}
                  style={{ top: 57 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading||isError
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
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>{row.deviceType}</TableCell>
                      <TableCell align="right">
                        {moment
                          .utc(row.date)
                          .local()
                          .format("MM/DD/yyyy HH:mm")}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Button
                          variant="contained"
                          color={"primary"}
                          onClick={() => navigate(`/scans/${row.id}`)}
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
