import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../../store/context";

import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";
import { toast } from "react-toastify";

import DeleteDialog from "../../Dialog/DeleteDialog";
import UpdateUser from "../../Dialog/UpdateUser";
import UserFilteringForm from "../../Forms/FilteringForms/UserFilteringForm/UserFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import TableSize from "../../TableSize/TableSize";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UserList = () => {
  const context = useContext(EatFitProContext);

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

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
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (value) => {
        return (
          <div>
            <DeleteIcon
              type="submit"
              style={{ cursor: "pointer", color: "red", marginRight: 10 }}
              onClick={() => {
                context.openDeleteDialog(value);
              }}
            />
            <EditIcon
              type="submit"
              style={{ cursor: "pointer", color: "blueviolet" }}
              onClick={() => {
                context.openUpdateDialog(value, value.id);
                context.setUpdatingItem(value.row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const updateHandler = (value) => {
    updateUser(value);
  };

  const updateUser = async (value) => {
    const url = `http://localhost:8080/user/update?id=${context.idOfUpdatingItem}`;

    const dataJSON = JSON.stringify(value);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJSON,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        fetchFilteredData(context.filterUserData, pageNumber, userListSize);
        toast.success(
          `${context.updatingItem.name}
          ${context.updatingItem.surname}'s information is updated successfully!`,
          {
            position: "bottom-left",
            draggable: true,
            pauseOnHover: false,
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = () => {
    deleteUser(context.idOfDeletingItem);
  };

  const deleteUser = (id) => {
    const url = `http://localhost:8080/user/delete?id=${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        fetchFilteredData(context.filterUserData, pageNumber, userListSize);
        console.log(data);
        checkDelete(data, "User");
      });
  };

  const fetchFilteredData = async (
    filterUserData,
    pageNumber,
    userListSize
  ) => {
    const url = `http://localhost:8080/user/get/filtered?page=${
      pageNumber - 1
    }&size=${userListSize}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setUserList(data.content);
        setTotalPage(data.totalPages);
        setIsDatabaseConnected(true);
      })
      .catch((error) => {
        console.log(error);
        setIsDatabaseConnected(false);
      });
  };

  useEffect(() => {
    fetchFilteredData(context.filterUserData, pageNumber, userListSize);
  }, [context.filterUserData, pageNumber, userListSize, isDatabaseConnected]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <DeleteDialog deleteHandler={deleteHandler} name="user" />
      <UpdateUser updateHandler={updateHandler} />
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
        <TableSize setPageNumber={setPageNumber} name="user" />
        <div>
          <div
            style={{
              width: 850,
              height: 318,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              isDatabaseConnected ? (
                <CircularProgress />
              ) : (
                <div>Server Error</div>
              )
            ) : (
              <DataGrid
                rows={userList}
                columns={columns}
                hideFooter
                style={{
                  maxHeight: 318,
                  minHeight: 318,
                  width: 850,
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
