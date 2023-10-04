import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../../store/context";

import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";

import DialogUI from "../../Dialog/DialogUI";
import FoodCategoryFilteringForm from "../../Forms/FilteringForms/FoodCategoryFilteringForm/FoodCategoryFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import TableSize from "../../TableSize/TableSize";

import DeleteIcon from "@mui/icons-material/Delete";

const FoodCategoryList = () => {
  const context = useContext(EatFitProContext);

  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  let foodCategoryListSize = context.foodCategoryListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
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
    deleteFoodCategory(context.idOfDeletingItem);
  };

  const deleteFoodCategory = (id) => {
    const url = `http://localhost:8080/foodCategory/delete?id=${id}`;
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
        checkDelete(data, "Food Category");
      });
  };

  const fetchFilteredData = (
    filterFoodCategoryData,
    pageNumber,
    foodCategoryListSize
  ) => {
    const url = `http://localhost:8080/foodCategory/get/filtered?page=${
      pageNumber - 1
    }&size=${foodCategoryListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterFoodCategoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setFoodCategoryList(data.content);
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
      context.filterFoodCategoryData,
      pageNumber,
      foodCategoryListSize
    );
  }, [
    context.filterFoodCategoryData,
    pageNumber,
    foodCategoryListSize,
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
      <DialogUI deleteHandler={deleteHandler} name="food category" />
      <FoodCategoryFilteringForm setPageNumber={setPageNumber} />
      <div
        style={{
          marginLeft: 30,
          marginTop: -20,
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TableSize setPageNumber={setPageNumber} name="food category" />
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
                rows={foodCategoryList}
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

export default FoodCategoryList;
