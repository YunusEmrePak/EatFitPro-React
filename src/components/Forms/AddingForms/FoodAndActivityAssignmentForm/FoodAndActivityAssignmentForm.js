import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState, useRef } from "react";

import ButtonUI from "../../../UI/Button/Button";

const FoodAndActivityAssignmentForm = () => {
  const [databaseUsers, setDatabaseUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [databaseFoodNames, setDatabaseFoodNames] = useState([]);
  const [foodNames, setFoodNames] = useState([]);
  const [foodId, setFoodId] = useState([]);
  const [databaseActivityNames, setDatabaseActivityNames] = useState([]);
  const [activityNames, setActivityNames] = useState([]);
  const dateRef = useRef();

  const fetchData = async (dataJSON) => {
    const url = "http://localhost:8080/foodAndActivityAssignment/add";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJSON,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    const url = "http://localhost:8080/user/get/all";
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
        setDatabaseUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    getUsers();
    getFoodNames();
    getActivityNames();
  }, [foodNames]);

  const submitHandler = (event) => {
    event.preventDefault();
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
        id: users,
      },
      foodList: foods[0],
      activityList: activities[0],
      date: dateRef ? dateRef.current.value : null,
    };

    const dataJSON = JSON.stringify(data);

    fetchData(dataJSON);

    // console.log(dataJSON);
    console.log(data);
    // console.log(foodNames)
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
      <div>
        <Autocomplete
          options={databaseUsers}
          getOptionLabel={(option) => option.name + " " + option.surname}
          label="Users"
          clearOnBlur
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Users"
              style={{ width: "41.8ch" }}
            />
          )}
          onChange={(event, value) => {
            setUsers(value.id);
          }}
        />
        <Autocomplete
          multiple
          options={databaseFoodNames}
          getOptionLabel={(option) => option.name}
          clearOnBlur
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
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
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Activity Names"
              style={{ width: "41.8ch" }}
            />
          )}
          onChange={(event, value) => {
            setActivityNames(value);
          }}
        />
        <TextField size="small" inputRef={dateRef} type="date" />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "42.8ch" }}
      >
        <ButtonUI name="Add" variant="contained" type="submit" />
      </div>
    </Box>
  );
};

export default FoodAndActivityAssignmentForm;
