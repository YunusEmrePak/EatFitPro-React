import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const UserList = () => {
    const [userList, setUserList] = useState([]);

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
        setUserList(data);
      });

  const rows = [
    { id: 1, surname: "Snow", name: "Jon", weight: 20, length: 40, email: "JonSnow@gmail.com" },
    { id: 2, surname: "Snow2", name: "Jon2", weight: 21, length: 41, email: "JonSnow2@gmail.com" },
    { id: 3, surname: "Snow3", name: "Jon3", weight: 22, length: 42, email: "JonSnow3@gmail.com" },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
    </Box>
  );
};

export default UserList;
