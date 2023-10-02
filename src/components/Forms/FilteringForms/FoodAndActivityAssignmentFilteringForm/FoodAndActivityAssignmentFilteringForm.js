import { useContext, useRef, useState, useEffect } from "react";
import EatFitProContext from "../../../../store/context";

import {
  Box,
  TextField,
  Slider,
  Typography,
  Autocomplete,
} from "@mui/material";

import ButtonUI from "../../../UI/Button/Button";

const FoodAndActivityAssignmentFiltering = (props) => {
  const context = useContext(EatFitProContext);
  const [food, setFood] = useState(null);
  const [activity, setActivity] = useState(null);
  const [databaseFoodName, setDatabaseFoodName] = useState([]);
  const [databaseActivityName, setDatabaseActivityName] = useState([]);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const dateRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      surname: surnameRef.current.value ? surnameRef.current.value : null,
      foodName: food ? food.name : null,
      activityName: activity ? activity.name : null,
      date: dateRef ? dateRef.current.value : null,
    };

    console.log(data)
    context.setFilterFoodData(data);
    props.setPageNumber(1);
  };

  useEffect(() => {
    const foodNameUrl = "http://localhost:8080/food/get/all";
    fetch(foodNameUrl, {
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
      });
    const activityNameUrl = "http://localhost:8080/activity/get/all";
    fetch(activityNameUrl, {
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
      });
  }, []);

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
