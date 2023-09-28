import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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

  let userListSize = context.userListSize;

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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            defaultValue={10}
            size="small"
            label="Size"
            style={{ width: "12ch" }}
            onChange={(event) => {
              context.setUserListSize(event.target.value);
              setPageNumber(1);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <div>
          <div
            style={{
              width: 700,
              height: 318,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
          </div>

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
