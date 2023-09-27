import { CircularProgress, TextField, Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import UserFilteringForm from "../../Forms/FilteringForms/UserFilteringForm/UserFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import EatFitProContext from "../../store/context";

const UserList = () => {
  const context = useContext(EatFitProContext);

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // const [sizeNumber, setSizeNumber] = useState

  let userListSize = context.userListSize;

  const size = [
    { number: "5" },
    { number: "10" },
    { number: "15" },
    { number: "20" },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
      sortable: false,
      filterable: false,
    },
    {
      field: "length",
      headerName: "Length",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 110,
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        // marginTop: -10,
      }}
    >
      <UserFilteringForm setPageNumber={setPageNumber} />
      <div
        style={{
          marginLeft: 30,
          marginTop: -20,
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <Autocomplete
          getOptionLabel={(option) => option.number}
          clearOnEscape
          options={size}
          size="small"
          defaultValue={{ number: "5" }}
          renderInput={(params) => (
            <TextField {...params} label="Size" style={{ width: "12ch" }} />
          )}
          onChange={(event, value) => {
            console.log(value);
            if (value === null) {
              context.setUserListSize(5);
            } else {
              context.setUserListSize(parseInt(value.number, 10));
            }
          }}
        />
        <div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={userList}
              columns={columns}
              hideFooter
              style={{
                maxHeight: 318,
                minHeight: 318,
                width: 700,
                marginTop: 10,
              }}
            />
          )}
          <TablePagination
            pageNumber={pageNumber}
            totalPage={totalPage}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
