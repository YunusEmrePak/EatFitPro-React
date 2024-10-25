import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

import ButtonUI from "../../../UI/Button/Button";

const FoodAndActivityAssignmentForm = () => {
  const [databaseUsers, setDatabaseUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [databaseFoodNames, setDatabaseFoodNames] = useState([]);
  const [foodNames, setFoodNames] = useState([]);
  const [databaseActivityNames, setDatabaseActivityNames] = useState([]);
  const [activityNames, setActivityNames] = useState([]);

  const emailRef = useRef(null);
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

  // const getUsersByEmail = async (email) => {
  //   const url = `http://localhost:8080/user/getByEmail?email=${email}`;
  //   await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setDatabaseUsers([data]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getFilteredUsers = async (filterUserData) => {
    const url = "http://localhost:8080/user/get/filtered?page=0&size=20";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDatabaseUsers(data.content);
        console.log(data.content);
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
    getFoodNames();
    getActivityNames();
  }, [foodNames]);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(dateRef.current.value);

    if (users.length === undefined && dateRef.current.value !== "") {
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

      toast.success("Data is added correctly!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
    } else {
      toast.error("Data couldn't added!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
    }
  };

  const submitHandlerOfUserName = (event) => {
    event.preventDefault();

    // getUsersByEmail(emailRef.current.value);

    const data = {
      name: null,
      surname: null,
      email: emailRef.current.value,
      length: null,
      weight: null,
    };
    getFilteredUsers(data);
  };

  return (
    <div>
      <Box
        component="form"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "42.8ch",
        }}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submitHandlerOfUserName}
      >
        <TextField
          label="Email"
          size="small"
          inputRef={emailRef}
          style={{ width: "30ch" }}
        />
        <ButtonUI name="Filter" type="submit" variant="contained" />
      </Box>
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
            getOptionLabel={(option) =>
              databaseUsers && option.name + " " + option.surname
            }
            label="Users"
            clearOnBlur
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
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
                // variant="standard"
                label="Activity Names"
                style={{ width: "41.8ch" }}
              />
            )}
            onChange={(event, value) => {
              setActivityNames(value);
            }}
          />
          <TextField
            size="small"
            inputRef={dateRef}
            type="date"
            style={{ width: "41.8ch" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "42.8ch",
          }}
        >
          <ButtonUI name="Add" variant="contained" type="submit" />
        </div>
      </Box>
    </div>
  );
};

export default FoodAndActivityAssignmentForm;
