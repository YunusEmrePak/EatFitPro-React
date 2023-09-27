import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import FoodCategoryFilteringForm from "../../Forms/FilteringForms/FoodActivityFIlteringForm/FoodCategoryFIlteringForm";
import TablePagination from "../../Pagination/TablePagination";
import EatFitProContext from "../../store/context";

const FoodCategoryList = () => {
  const context = useContext(EatFitProContext);

  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  let foodCategoryListSize = context.foodCategoryListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 110,
      sortable: false,
      filterable: false,
    },
  ];

  useEffect(() => {
    const url = `http://localhost:8080/foodCategory/get/filtered?page=${
      pageNumber - 1
    }&size=${foodCategoryListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterFoodCategoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setFoodCategoryList(data.content);
        setTotalPage(data.totalPages);
      });
  }, [context.filterFoodCategoryData, pageNumber, foodCategoryListSize]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            defaultValue={10}
            size="small"
            label="Size"
            style={{ width: "12ch" }}
            onChange={(event) => {
              context.setFoodCategoryListSize(event.target.value);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={foodCategoryList}
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

export default FoodCategoryList;
