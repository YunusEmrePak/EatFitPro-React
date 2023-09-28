import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonUI from "../../../UI/Button/Button";

const FoodForm = () => {
  const [databaseCategories, setDatabaseCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const nameRef = useRef();
  const caloriesRef = useRef();

  const [nameError, setNameError] = useState(false);
  const [caloriesError, setCaloriesError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const errorHandler = () => {
    let errorCounter = 0;
    if (nameRef.current.value.trim().length === 0) {
      setNameError(true);
      errorCounter += 1;
    }
    if (caloriesRef.current.value.trim().length === 0) {
      setCaloriesError(true);
      errorCounter += 1;
    }
    if (category === "" || category === null) {
      setCategoryError(true);
      errorCounter += 1;
    }

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

  const submitHandler = (event) => {
    event.preventDefault();

    if (!errorHandler()) {
      const data = {
        name: nameRef.current.value,
        calories: caloriesRef.current.value,
        foodCategory: {
          id: category.id,
        },
      };

      const dataJSON = JSON.stringify(data);

      const url = "http://localhost:8080/food/add";

      fetch(url, {
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
        });

      nameRef.current.value = "";
      caloriesRef.current.value = "";
      setCategory(null);
      toast.success("Data is added correctly!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
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
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          label="Name"
          size="small"
          inputRef={nameRef}
          error={nameError ? true : false}
          onChange={() => {
            setNameError(false);
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          label="Calories"
          size="small"
          type="number"
          inputRef={caloriesRef}
          error={caloriesError ? true : false}
          onChange={() => {
            setCaloriesError(false);
          }}
        />
      </div>
      <div>
        <Autocomplete
          getOptionLabel={(option) => option.name}
          clearOnEscape
          options={databaseCategories}
          size="small"
          value={category}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              style={{ width: "41.8ch" }}
              error={categoryError ? true : false}
            />
          )}
          onChange={(event, value) => {
            setCategory(value);
            setCategoryError(false);
          }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "42.8ch" }}
      >
        <ButtonUI
            name="Add"
            variant="contained"
            type="submit"
          />
      </div>
    </Box>
  );
};

export default FoodForm;
