import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      type: "email",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "length",
      headerName: "Length",
      type: "number",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const url = "http://localhost:8080/user/get/all";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setUserList(data);
    });

  return (
    <Box sx={{ height: 400, width: "400", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <DataGrid
          rows={userList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      )}
    </Box>
  );
};

export default UserList;
