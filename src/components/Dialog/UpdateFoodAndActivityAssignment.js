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

import React, { useContext, useEffect, useState } from "react";
import EatFitProContext from "../../store/context";
const UpdateFoodAndActivityAssignment = (props) => {
  const context = useContext(EatFitProContext);
  const [databaseFoodNames, setDatabaseFoodNames] = useState([]);
  const [foodNames, setFoodNames] = useState([]);
  const [databaseActivityNames, setDatabaseActivityNames] = useState([]);
  const [activityNames, setActivityNames] = useState([]);

  const getFoodNames = () => {
    const url = "http://localhost:8080/food/get/all";
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
        setDatabaseFoodNames(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getActivityNames = () => {
    const url = "http://localhost:8080/activity/get/all";
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
        setDatabaseActivityNames(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFoodNames();
    getActivityNames();
  }, [foodNames, activityNames]);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(context.updatingItem);
    console.log(foodNames);
    let foods = [
      foodNames.map((value) => {
        return {
          id: value.id,
        };
      }),
    ];

    let activities = [
      activityNames.map((value) => {
        return {
          id: value.id,
        };
      }),
    ];

    const data = {
      user: {
        id: context.updatingItem.userDto.id,
      },
      foodList:
        foodNames.length > 0 ? foods[0] : context.updatingItem.foodDtoList,
      activityList:
        activityNames.length > 0
          ? activities[0]
          : context.updatingItem.activityDtoList,
      date: context.updatingItem.date,
    };

    console.log(data);
    setFoodNames([])
    setActivityNames([])
    props.updateHandler(data);
  };

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
          {context.isClickedUpdateButton &&
            context.updatingItem.userDto.name +
              " " +
              context.updatingItem.userDto.surname +
              "'s Information"}
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            options={databaseFoodNames}
            getOptionLabel={(option) => option.name}
            clearOnBlur
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={
              foodNames.length > 0
                ? foodNames
                : context.updatingItem.foodDtoList
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Food Names"
                style={{ width: "41.8ch" }}
              />
            )}
            onChange={(event, value) => {
              setFoodNames(value);
            }}
          />
          <Autocomplete
            multiple
            options={databaseActivityNames}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            clearOnBlur
            value={
              activityNames.length > 0
                ? activityNames
                : context.updatingItem.activityDtoList
            }
            renderInput={(params) => (
              <TextField
                {...params}
                // variant="standard"
                label="Activity Names"
                style={{ width: "41.8ch" }}
              />
            )}
            onChange={(event, value) => {
              setActivityNames(value);
            }}
          />
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

export default UpdateFoodAndActivityAssignment;
