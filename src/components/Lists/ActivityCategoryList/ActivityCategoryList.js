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
