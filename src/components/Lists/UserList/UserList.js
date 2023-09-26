import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import UserFilteringForm from "../../Forms/FilteringForms/UserFilteringForm/UserFIlteringForm";
import EatFitProContext from "../../store/context";
import TablePagination from "../../Pagination/TablePagination";

const UserList = () => {
  const context = useContext(EatFitProContext);

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  let userListSize = context.userListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "length",
      headerName: "Length",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  useEffect(() => {
    const url = `http://localhost:8080/user/get/filtered?page=${
      pageNumber - 1
    }&size=${userListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setUserList(data.content);
        setTotalPage(data.totalPages);
      });
  }, [context.filterUserData, pageNumber, userListSize]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -10,
        }}
      >
        <UserFilteringForm />
        <div style={{ marginLeft: 30 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <DataGrid rows={userList} columns={columns} hideFooter style={{maxHeight: 320, minHeight: 320}} />
          )}
          <TablePagination pageNumber={pageNumber} totalPage={totalPage} setPageNumber={setPageNumber} />
        </div>
      </div>
    </div>
  );
};

export default UserList;

{
  /* <TableContainer
            component={Paper}
            style={{ maxHeight: 400, marginTop: 20 }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    size="small"
                    style={{ fontSize: fontSize }}
                  >
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: fontSize }}>
                    Surname
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: fontSize }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: fontSize }}>
                    Length
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: fontSize }}>
                    Weight
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      style={{ height: 70, fontSize: fontSize }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left" style={{ fontSize: fontSize }}>
                      {row.surname}
                    </TableCell>
                    <TableCell align="left" style={{ fontSize: fontSize }}>
                      {row.email}
                    </TableCell>
                    <TableCell align="left" style={{ fontSize: fontSize }}>
                      {row.length}
                    </TableCell>
                    <TableCell align="left" style={{ fontSize: fontSize }}>
                      {row.weight}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */
}
