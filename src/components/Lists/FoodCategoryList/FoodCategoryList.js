import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const FoodCategoryList = () => {
  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const url = "http://localhost:8080/foodCategory/get/all";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setFoodCategoryList(data);
    });

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <DataGrid
          rows={foodCategoryList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      )}
    </Box>
  );
};

export default FoodCategoryList;
