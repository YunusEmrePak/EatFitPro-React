import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";

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
    // {
    //   field: "weight",
    //   headerName: "Weight",
    //   type: "number",
    //   width: 130,
    //   sortable: false,
    //   filterable: false,
    // },
  ];

  const rows = [
    { id: 1, name: "Apple", calories: 50 },
    { id: 2, name: "Orange", calories: 60 },
    { id: 3, name: "Banana", calories: 70 },
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
    <Box sx={{ height: 400, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"  }}>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <DataGrid
          rows={rows}
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
