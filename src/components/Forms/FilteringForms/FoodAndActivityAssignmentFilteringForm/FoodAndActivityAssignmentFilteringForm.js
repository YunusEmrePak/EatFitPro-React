import { useContext, useEffect, useRef, useState } from "react";
import EatFitProContext from "../../../../store/context";

import { Autocomplete, Box, TextField } from "@mui/material";

import ButtonUI from "../../../UI/Button/Button";

const FoodAndActivityAssignmentFiltering = (props) => {
  const context = useContext(EatFitProContext);
  const [food, setFood] = useState(null);
  const [activity, setActivity] = useState(null);
  const [databaseFoodName, setDatabaseFoodName] = useState([]);
  const [databaseActivityName, setDatabaseActivityName] = useState([]);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const dateRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      userName: nameRef.current.value ? nameRef.current.value : null,
      userSurname: surnameRef.current.value ? surnameRef.current.value : null,
      foodName: food ? food.name : null,
      activityName: activity ? activity.name : null,
      date: dateRef ? dateRef.current.value : null,
    };
    context.setFilterFoodAndActivityAssignmentData(data);
    props.setPageNumber(1);
  };

  const fetchFoodData = async () => {
    const foodNameUrl = "http://localhost:8080/food/get/all";
    await fetch(foodNameUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatabaseFoodName(data);
        setIsDatabaseConnected(true);
      })
      .catch((error) => {
        console.log(error);
        setIsDatabaseConnected(false);
      });
  };

  const fetchActivityData = async () => {
    const activityNameUrl = "http://localhost:8080/activity/get/all";
    await fetch(activityNameUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatabaseActivityName(data);
      })
      .catch((error) => {
        console.log(error);
        setIsDatabaseConnected(false);
      });
  };

  useEffect(() => {
    fetchFoodData();
    fetchActivityData();
  }, [isDatabaseConnected]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: 370,
          width: 190,
          marginTop: 20,
        }}
      >
        <div>
          <TextField label="Name" size="small" inputRef={nameRef} />
          <TextField label="Surname" size="small" inputRef={surnameRef} />
          <Autocomplete
            getOptionLabel={(option) => option.name}
            clearOnEscape
            options={databaseFoodName}
            size="small"
            value={food}
            renderInput={(params) => (
              <TextField {...params} label="Food Name" />
            )}
            onChange={(event, value) => {
              setFood(value);
            }}
          />
          <Autocomplete
            getOptionLabel={(option) => option.name}
            clearOnEscape
            options={databaseActivityName}
            size="small"
            value={activity}
            renderInput={(params) => (
              <TextField {...params} label="Activity Name" />
            )}
            onChange={(event, value) => {
              setActivity(value);
            }}
          />
          <TextField size="small" inputRef={dateRef} type="date" />
        </div>
        <div>
          <ButtonUI name="Filter" variant="contained" type="submit" />
        </div>
      </div>
    </Box>
  );
};

export default FoodAndActivityAssignmentFiltering;
