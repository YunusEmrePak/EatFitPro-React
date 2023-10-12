import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../../store/context";

import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";

import DeleteDialog from "../../Dialog/DeleteDialog";
import ActivityCategoryFilteringForm from "../../Forms/FilteringForms/ActivityCategoryFilteringForm/ActivityCategoryFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import TableSize from "../../TableSize/TableSize";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateActivityCategory from "../../Dialog/UpdateActivityCategory";
import { toast } from "react-toastify";

const ActivityCategoryList = () => {
  const context = useContext(EatFitProContext);

  const [activityCategoryList, setActivityCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  let activityCategoryListSize = context.activityCategoryListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
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
    const url = `http://localhost:8080/activityCategory/update?id=${context.idOfUpdatingItem}`;

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
        fetchFilteredData(
          context.filterActivityCategoryData,
          pageNumber,
          activityCategoryListSize
        );
        toast.success(
          `${context.updatingItem.name}
          's information is updated successfully!`,
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
    deleteActivityCategory(context.idOfDeletingItem);
  };

  const deleteActivityCategory = (id) => {
    const url = `http://localhost:8080/activityCategory/delete?id=${id}`;
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
        fetchFilteredData(
          context.filterActivityCategoryData,
          pageNumber,
          activityCategoryListSize
        );
        console.log(data);
        checkDelete(data, "Activity category");
      });
  };

  const fetchFilteredData = (
    filterActivityCategoryData,
    pageNumber,
    activityCategoryListSize
  ) => {
    const url = `http://localhost:8080/activityCategory/get/filtered?page=${
      pageNumber - 1
    }&size=${activityCategoryListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterActivityCategoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setActivityCategoryList(data.content);
        setTotalPage(data.totalPages);
        setIsDatabaseConnected(true);
      })
      .catch((error) => {
        console.log(error);
        setIsDatabaseConnected(false);
      });
  };

  useEffect(() => {
    fetchFilteredData(
      context.filterActivityCategoryData,
      pageNumber,
      activityCategoryListSize
    );
  }, [
    context.filterActivityCategoryData,
    pageNumber,
    activityCategoryListSize,
    isDatabaseConnected,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <DeleteDialog deleteHandler={deleteHandler} name="activity category" />
      <UpdateActivityCategory updateHandler={updateHandler} />
      <ActivityCategoryFilteringForm setPageNumber={setPageNumber} />
      <div
        style={{
          marginLeft: 30,
          marginTop: -20,
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TableSize setPageNumber={setPageNumber} name="activity category" />
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
                rows={activityCategoryList}
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

export default ActivityCategoryList;
