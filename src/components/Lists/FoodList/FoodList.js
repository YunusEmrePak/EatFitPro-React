import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const FoodList = () => {
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
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
      field: "foodCategoryDto",
      headerName: "Category",
      width: 130,
      sortable: false,
      filterable: false,
      valueGetter: (params) => params.row?.foodCategoryDto?.name,
    },
  ];

  const url = "http://localhost:8080/food/get/all";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setFoodList(data);
    });

  return (
    <Box
      sx={{
        height: 400,
        width: 450,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <DataGrid
          rows={foodList}
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

export default FoodList;
