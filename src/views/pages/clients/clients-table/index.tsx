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
import { TableRow as RowSkeleton } from "../../../../components/cards/skeleton/TableRow";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import SearchSection from "../clients-search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IssueSearchBar from "../clients-search/IssueSearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { isInteger } from "formik";
import { useQuery } from "react-query";
import { CLIENTS } from "../../../../store/queryKeys";
import { getClients } from "../../../../services/clientService";




export default function ClientsTable() {
  

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryPage: any = searchParams.get("page");
  const [page, setPage]: any = React.useState(
    isInteger(queryPage) ? parseInt(queryPage) : 0
  );
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(5);
  const { isLoading, data, isError, error, isFetching, refetch, status } =
    useQuery([CLIENTS, page, rowsPerPage], () => getClients(page, rowsPerPage));
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
      <TableContainer sx={{ maxHeight: '100vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={1} width={'50%'} >
                <SearchSection />
              </TableCell>
              <TableCell colSpan={3} width={'100%'} align="right">
                <IssueSearchBar />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ top: 57}}>Id</TableCell>
              <TableCell style={{ top: 57 }}>Email</TableCell>
              <TableCell style={{ top: 57}}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isLoading
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
              :
            (data.data.map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell >{row.id}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell >
                    <Button
                      onClick={()=>navigate(`/clients/${row.id}`)}
                      fullWidth
                      variant="contained"
                      color={"primary"}
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }))}
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
