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
import Button from "@mui/material/Button";
import { TableRow as RowSkeleton } from "../../../../components/cards/skeleton/TableRow";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { isInteger } from "formik";
import { CLIENTSCANS } from "../../../../store/queryKeys";
import { useQuery } from "react-query";
import { getScansByClient } from "../../../../services/scanService";

const columns: any = [
  { id: "deviceType", label: "Device", minWidth: 100 },
  { id: "date", label: "Scan Date", minWidth: 100 },
  { id: "view", label: "View", minWidth: 100 },
];

export default function ScansTable({ clientId }: any) {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryPage: any = searchParams.get("page");

  const navigate = useNavigate();
  const [page, setPage]: any = React.useState(
    isInteger(queryPage) ? parseInt(queryPage) : 0
  );
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(5);

  const { isLoading, data, isError, error, isFetching, refetch, status } =
    useQuery([CLIENTSCANS, clientId, page, rowsPerPage], () =>
      getScansByClient(clientId, page, rowsPerPage)
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

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ vh: "100%" }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any, i:any) => (
                <TableCell
                  key={column.id}
                  align={i!==0?'right':'left'}
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
                      {[...Array(2)].map((x, i) => (
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
