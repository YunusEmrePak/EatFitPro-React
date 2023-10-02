import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
//   import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import ActivityFilteringForm from "../../Forms/FilteringForms/ActivityFilteringForm/ActivityFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import EatFitProContext from "../../store/context";

const ActivityList = () => {
  const context = useContext(EatFitProContext);

  const [activityList, setActivityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

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
    //   {
    //     field: "edit",
    //     headerName: "Edit",
    //     width: 110,
    //     sortable: false,
    //     filterable: false,
    //     renderCell: (value) => {
    //       return (
    //         <DeleteIcon
    //           type="submit"
    //           style={{ cursor: "pointer", color: "red" }}
    //           onClick={() => {
    //             deleteHandler(value);
    //           }}
    //         />
    //       );
    //     },
    //   },
  ];

  // const deleteHandler = (value) => {
  //   console.log(value.id);
  //   deleteUser(value.id);
  // };

  // const deleteUser = (id) => {
  //   const url = `http://localhost:8080/activity/delete?id=${id}`;
  //   fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((data) => {
  //       fetchFilteredData();
  //       console.log(data);
  //     });
  // };

  useEffect(() => {
    const url = `http://localhost:8080/activity/get/filtered?page=${
      pageNumber - 1
    }&size=${activityListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterActivityData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setActivityList(data.content);
        setTotalPage(data.totalPages);
      });
  }, [context.filterActivityData, pageNumber, activityListSize]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            defaultValue={10}
            size="small"
            label="Size"
            style={{ width: "12ch" }}
            onChange={(event) => {
              context.setActivityListSize(event.target.value);
              setPageNumber(1);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <div>
          <div
            style={{
              width: 700,
              height: 318,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <DataGrid
                rows={activityList}
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
