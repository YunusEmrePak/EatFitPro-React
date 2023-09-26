import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import FoodFilteringForm from "../../Forms/FilteringForms/FoodFilteringForm/FoodFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import EatFitProContext from "../../store/context";

const FoodList = () => {
  const context = useContext(EatFitProContext);

  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  let foodListSize = context.foodListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "calories",
      headerName: "Calories",
      width: 110,
      sortable: false,
      filterable: false,
    },
    {
      field: "foodCategoryDto",
      headerName: "Category",
      width: 130,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.foodCategoryDto?.name,
    },
  ];

  useEffect(() => {
    const url = `http://localhost:8080/food/get/filtered?page=${
      pageNumber - 1
    }&size=${foodListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterFoodData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setFoodList(data.content);
        setTotalPage(data.totalPages);
      });
  }, [context.filterFoodData, pageNumber, foodListSize]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: -10,
      }}
    >
      <FoodFilteringForm setPageNumber={setPageNumber} />
      <div style={{ marginLeft: 30 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={foodList}
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
  );
};

export default FoodList;
