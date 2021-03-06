import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { TableRow as RowSkeleton } from "../../../../components/cards/skeleton/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ServiceModal from "../service-modal";
import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import { isInteger } from "formik";
import { useQuery } from "react-query";
import { SERVICES } from "../../../../store/queryKeys";
import { getServices } from "../../../../services/endpointService";
import EditServiceModal from "../service-modal/EditServiceModal";
import DeleteAlert from "../service-modal/DeleteAlert";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const columns: any = [
  { id: "description", label: "Description", minWidth: 170 },
  { id: "isActive", label: "Status", minWidth: 100 },
  { id: "edit", label: "Edit", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 100 },
];

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell align="right">
          <Typography
            lineHeight={"normal"}
            fontWeight={"bold"}
            color={row.isActive ? "green" : "red"}
            alignItems={"center"}
            justifyContent={'flex-end'}
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
        <TableCell align="right">
         <EditServiceModal serviceId={row.id} service={row}/>
        </TableCell>
        <TableCell align="right">
          <DeleteAlert serviceId={row.id}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography style={{lineHeight:'30px'}}>
              <h1>Url: {row.url}</h1>
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ServicesTable() {
  const { search } = useLocation();
  const alert = useAlert()
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const searchParams = new URLSearchParams(search);
  const queryPage: any = searchParams.get("page");
  const navigate = useNavigate();
  const [page, setPage]: any = React.useState(
    isInteger(queryPage) ? parseInt(queryPage) : 0
  );
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]: any = React.useState(5);

  const { isLoading, data, isError, error, isFetching, refetch, status }:any =
    useQuery([SERVICES, page, rowsPerPage], () =>
      getServices(jwt,page, rowsPerPage)
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
      <TableContainer sx={{ vh:'100%' }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell><ServiceModal /></TableCell>
              {columns.map((column: any, i:any) => (
                <TableCell
                  key={column.id}
                  align={i!==0?'right':'left'}
                  style={{ top: 57}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading||isError? (
              [...Array(rowsPerPage)].map((x, i) => {
                return (
                  <TableRow>
                    {[...Array(5)].map((x, i) => (
                      <TableCell>
                        <RowSkeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              data.data.map((row: any) => {
                return <Row row={row} />;
              })
            )}
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
