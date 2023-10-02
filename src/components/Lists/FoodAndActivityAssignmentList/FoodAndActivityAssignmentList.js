import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../../store/context";

import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import checkDelete from "../../../utils/checkDelete";

import DialogUI from "../../Dialog/DialogUI";
import FoodAndActivityAssignmentFiltering from "../../Forms/FilteringForms/FoodAndActivityAssignmentFilteringForm/FoodAndActivityAssignmentFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import TableSize from "../../TableSize/TableSize";

// import DeleteIcon from "@mui/icons-material/Delete";

const FoodAndActivityAssignmentList = () => {
  const context = useContext(EatFitProContext);

  const [foodAndActivityAssignmentList, setFoodAndActivityAssignmentList] =
    useState([]);
  const [foodNameList, setFoodNameList] = useState([]);
  const [activityNameList, setActivityNameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

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
      width: 150,
      sortable: false,
      filterable: false,
        // valueGetter: (params) => {
        //   console.log({ params });
        //   // params.row?.foodDtoList?.name;
    //     // },
    //   renderCell: (params) => {
    //     // console.log(params.row.foodDtoList);
    //     (params.row.id === params.id) ? 
    //   },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      sortable: false,
      filterable: false,
    },
  ];

  //   const makeList = () => {
  //     foodAndActivityAssignmentList.forEach((element) => {
  //       element.foodDtoList.forEach((food) => {
  //         setFoodNameList((prevData) => {
  //           return [...prevData, food];
  //         });
  //       });
  //       element.activityDtoList.forEach((activity) => {
  //         setActivityNameList((prevData) => {
  //           return [...prevData, activity];
  //         });
  //       });
  //     });
  //   };

  const deleteHandler = () => {
    // deleteFoodAndActivityAssignment(context.idOfDeletingItem);
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
        fetchFilteredData();
        // console.log(data);
        checkDelete(data, "Food And Activity Assignment");
      });
  };

  const fetchFilteredData = () => {
    const url = `http://localhost:8080/foodAndActivityAssignment/get/filtered?page=${
      pageNumber - 1
    }&size=${foodAndActivityAssignmentListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterFoodAndActivityAssignmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.content);
        setIsLoading(false);
        setFoodAndActivityAssignmentList(data.content);
        setTotalPage(data.totalPages);
      });
  };

  useEffect(() => {
    fetchFilteredData();
    // makeList();
  }, [
    context.filterFoodAndActivityAssignmentData,
    pageNumber,
    foodAndActivityAssignmentListSize,
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
              <CircularProgress />
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
