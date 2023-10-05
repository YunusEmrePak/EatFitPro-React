import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../../store/context";

import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";

import DialogUI from "../../Dialog/DialogUI";
import FoodAndActivityAssignmentFiltering from "../../Forms/FilteringForms/FoodAndActivityAssignmentFilteringForm/FoodAndActivityAssignmentFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import SelectMenu from "../../SelectMenu/SelectMenu";
import TableSize from "../../TableSize/TableSize";

import DeleteIcon from "@mui/icons-material/Delete";

const FoodAndActivityAssignmentList = () => {
  const context = useContext(EatFitProContext);

  const [foodAndActivityAssignmentList, setFoodAndActivityAssignmentList] =
    useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  let foodAndActivityAssignmentListSize =
    context.foodAndActivityAssignmentListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 110,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.userDto?.name,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 110,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.userDto?.surname,
    },
    {
      field: "foodDtoList",
      headerName: "Food Name",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <SelectMenu name="Food Name" data={params.row.foodDtoList} />
      ),
    },
    {
      field: "activityDtoList",
      headerName: "Activity Name",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <SelectMenu name="Activity Name" data={params.row.activityDtoList} />
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
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
    deleteFoodAndActivityAssignment(context.idOfDeletingItem);
  };

  const deleteFoodAndActivityAssignment = (id) => {
    const url = `http://localhost:8080/foodAndActivityAssignment/delete?id=${id}`;
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
          context.filterFoodAndActivityAssignmentData,
          pageNumber,
          foodAndActivityAssignmentListSize
        );
        checkDelete(data, "Food And Activity Assignment");
      });
  };

  const fetchFilteredData = async (
    filterFoodAndActivityAssignmentData,
    pageNumber,
    foodAndActivityAssignmentListSize
  ) => {
    const url = `http://localhost:8080/foodAndActivityAssignment/get/filtered?page=${
      pageNumber - 1
    }&size=${foodAndActivityAssignmentListSize}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterFoodAndActivityAssignmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setFoodAndActivityAssignmentList(data.content);
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
      context.filterFoodAndActivityAssignmentData,
      pageNumber,
      foodAndActivityAssignmentListSize
    );
  }, [
    context.filterFoodAndActivityAssignmentData,
    pageNumber,
    foodAndActivityAssignmentListSize,
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
      <DialogUI
        deleteHandler={deleteHandler}
        name="food and activity assignment"
      />
      <FoodAndActivityAssignmentFiltering setPageNumber={setPageNumber} />
      <div
        style={{
          marginLeft: 30,
          marginTop: -20,
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TableSize
          setPageNumber={setPageNumber}
          name="food and activity assignment"
        />
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
                rows={foodAndActivityAssignmentList}
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

export default FoodAndActivityAssignmentList;
