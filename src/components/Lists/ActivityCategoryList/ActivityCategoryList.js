import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";
import DialogUI from "../../Dialog/DialogUI";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import ActivityCategoryFilteringForm from "../../Forms/FilteringForms/ActivityCategoryFilteringForm/ActivityCategoryFilteringForm";
import TablePagination from "../../Pagination/TablePagination";
import EatFitProContext from "../../store/context";

const ActivityCategoryList = () => {
  const context = useContext(EatFitProContext);

  const [activityCategoryList, setActivityCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  let activityCategoryListSize = context.activityCategoryListSize;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
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
    deleteActivityCategory(context.idOfDeletingItem);
  };

  const deleteActivityCategory = (id) => {
    const url = `http://localhost:8080/activityCategory/delete?id=${id}`;
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
        if (data === "Successfully Deleted!") {
          toast.success("Activity category successfully deleted!", {
            position: "bottom-left",
            draggable: true,
            pauseOnHover: false,
          });
        } else {
          toast.error("Activity category couldn't deleted!", {
            position: "bottom-left",
            draggable: true,
            pauseOnHover: false,
          });
        }
      });
  };

  const fetchFilteredData = () => {
    const url = `http://localhost:8080/activityCategory/get/filtered?page=${
      pageNumber - 1
    }&size=${activityCategoryListSize}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.filterActivityCategoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setActivityCategoryList(data.content);
        setTotalPage(data.totalPages);
      });
  };

  useEffect(() => {
    fetchFilteredData();
  }, [
    context.filterActivityCategoryData,
    pageNumber,
    activityCategoryListSize,
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <DialogUI deleteHandler={deleteHandler} name="activity category" />
      <ActivityCategoryFilteringForm setPageNumber={setPageNumber} />
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
              context.setActivityCategoryListSize(event.target.value);
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
              width: 810,
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
                rows={activityCategoryList}
                columns={columns}
                hideFooter
                style={{
                  maxHeight: 318,
                  minHeight: 318,
                  width: 810,
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

export default ActivityCategoryList;
