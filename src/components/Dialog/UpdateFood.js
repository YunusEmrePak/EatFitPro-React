import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

import React, { useContext, useEffect, useRef, useState } from "react";
import EatFitProContext from "../../store/context";
const UpdateFood = (props) => {
  const context = useContext(EatFitProContext);
  const [databaseCategories, setDatabaseCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const nameRef = useRef();
  const caloriesRef = useRef();

  const errorHandler = () => {
    let errorCounter = 0;
    if (nameRef.current.value.trim().length === 0) {
      errorCounter += 1;
    }
    if (caloriesRef.current.value.trim().length === 0) {
      errorCounter += 1;
    }
    // if (category === "" || category === null) {
    //   errorCounter += 1;
    // }

    if (errorCounter !== 0) {
      toast.error("All fields must be filled!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
      errorCounter = 0;
      return true;
    }
    if (errorCounter === 0) {
      return false;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!errorHandler()) {
      const data = {
        name: nameRef.current.value,
        calories: caloriesRef.current.value,
        foodCategory: {
          id: category ? category.id : context.updatingItem.foodCategoryDto.id,
        },
      };
      console.log(data);
      props.updateHandler(data);
    }
  };
  useEffect(() => {
    const url = "http://localhost:8080/foodCategory/get/all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatabaseCategories(data);
        // console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(
    category
      ? category.id
      : context.isClickedUpdateButton && context.updatingItem.foodCategoryDto.id
  );

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <Dialog
        onClose={() => {
          context.closeUpdateDialog();
        }}
        open={context.isClickedUpdateButton}
        disablePortal
      >
        <DialogTitle style={{ marginLeft: 10 }}>
          {context.updatingItem.name + "'s Information"}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              style={{ width: "41.8ch" }}
              label="Name"
              size="small"
              defaultValue={context.updatingItem.name}
              inputRef={nameRef}
            />
          </div>
          <div>
            <TextField
              style={{ width: "41.8ch" }}
              label="Calories"
              size="small"
              type="number"
              defaultValue={context.updatingItem.calories}
              inputRef={caloriesRef}
            />
          </div>
          <div>
            <Autocomplete
              getOptionLabel={(option) => option.name}
              clearOnEscape
              options={databaseCategories}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              size="small"
              value={
                category
                  ? category
                  : context.isClickedUpdateButton && context.updatingItem
                  ? {
                      id: context.updatingItem.foodCategoryDto.id,
                      name: context.updatingItem.foodCategoryDto.name,
                    }
                  : null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  style={{ width: "41.8ch" }}
                />
              )}
              onChange={(event, value) => {
                setCategory(value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={context.closeUpdateDialog}>
            Exit
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            onClick={() => {
              context.setIsClickedUpdateButton(false);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateFood;
