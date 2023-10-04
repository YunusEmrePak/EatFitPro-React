import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../../store/context";

import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";

import DialogUI from "../../Dialog/DialogUI";
import ActivityFilteringForm from "../../Forms/FilteringForms/ActivityFilteringForm/ActivityFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import TableSize from "../../TableSize/TableSize";

import DeleteIcon from "@mui/icons-material/Delete";

const ActivityList = () => {
  const context = useContext(EatFitProContext);

  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  let activityListSize = context.activityListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      sortable: false,
      filterable: false,
    },
    {
      field: "calories",
      headerName: "Calories",
      width: 130,
      sortable: false,
      filterable: false,
    },
    {
      field: "activityCategoryDto",
      headerName: "Category",
      width: 180,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.activityCategoryDto?.name,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (value) => {
        return (
          <DeleteIcon
            type="submit"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              context.openDeleteDialog(value);
            }}
          />
        );
      },
    },
  ];

  const deleteHandler = () => {
    deleteActivity(context.idOfDeletingItem);
  };

  const deleteActivity = (id) => {
    const url = `http://localhost:8080/activity/delete?id=${id}`;
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
        fetchFilteredData();
        console.log(data);
        checkDelete(data, "Activity");
      });
  };

  const fetchFilteredData = (
    filterActivityData,
    pageNumber,
    activityListSize
  ) => {
    const url = `http://localhost:8080/activity/get/filtered?page=${
      pageNumber - 1
    }&size=${activityListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterActivityData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setActivityList(data.content);
        setTotalPage(data.totalPages);
        setIsDatabaseConnected(true);
      })
      .catch((error) => {
        console.log(error);
        setIsDatabaseConnected(false);
      });
  };

  useEffect(() => {
    fetchFilteredData(context.filterActivityData, pageNumber, activityListSize);
  }, [
    context.filterActivityData,
    pageNumber,
    activityListSize,
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
      <DialogUI deleteHandler={deleteHandler} name="activity" />
      <ActivityFilteringForm setPageNumber={setPageNumber} />
      <div
        style={{
          marginLeft: 30,
          marginTop: -20,
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TableSize setPageNumber={setPageNumber} name="activity" />
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
                rows={activityList}
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

export default ActivityList;
