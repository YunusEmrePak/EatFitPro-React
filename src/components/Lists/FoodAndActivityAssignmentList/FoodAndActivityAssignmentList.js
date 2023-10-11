import React, { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import EatFitProContext from "../../../store/context";

import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";

import DeleteDialog from "../../Dialog/DeleteDialog";
import FoodAndActivityAssignmentFiltering from "../../Forms/FilteringForms/FoodAndActivityAssignmentFilteringForm/FoodAndActivityAssignmentFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
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
  const [foodAndActivityNames, setFoodAndActivityNames] = useState([]);

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

  const foodAnaActivityColumns = [
    {
      field: "foodName",
      headerName: "Food Name",
      width: 170,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.foodName?.name,
    },
    {
      field: "activityName",
      headerName: "Activity Name",
      width: 170,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.activityName?.name,
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

  const onRowSelect = (event) => {
    let length =
      event.row.foodDtoList.length > event.row.activityDtoList.length
        ? event.row.foodDtoList.length
        : event.row.activityDtoList.length;

    let data = [];

    for (let index = 0; index < length; index++) {
      data.push({
        id: uuid(),
        foodName: event.row.foodDtoList[index],
        activityName: event.row.activityDtoList[index],
      });
    }
    setFoodAndActivityNames(data);
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
      <DeleteDialog
        deleteHandler={deleteHandler}
        name="food and activity assignment"
      />
      <FoodAndActivityAssignmentFiltering setPageNumber={setPageNumber} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
          marginLeft: 30,
          marginTop: -25,
          width: 550,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: 500,
          }}
        >
          <TableSize
            setPageNumber={setPageNumber}
            name="food and activity assignment"
          />
        </header>
        <main
          style={{
            width: 500,
            height: 325,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
              onRowClick={onRowSelect}
              style={{
                maxHeight: 318,
                minHeight: 318,
                width: 500,
                marginTop: 10,
              }}
            />
          )}
        </main>
        <footer
          style={{
            width: 500,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TablePagination
            pageNumber={pageNumber}
            totalPage={totalPage}
            setPageNumber={setPageNumber}
          />
        </footer>
      </div>
      <aside style={{ marginTop: 15 }}>
        <DataGrid
          rows={foodAndActivityNames}
          columns={foodAnaActivityColumns}
          hideFooter
          style={{
            maxHeight: 318,
            minHeight: 318,
            width: 400,
            marginTop: 10,
          }}
        />
      </aside>
    </div>
  );
};

export default FoodAndActivityAssignmentList;
