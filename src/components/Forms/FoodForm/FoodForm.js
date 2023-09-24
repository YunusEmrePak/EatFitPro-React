import { useEffect, useRef, useState } from "react";
import { Button, Box, TextField, Autocomplete } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodForm = () => {
  const [databaseCategories, setDatabaseCategories] = useState([]);
  const [category, setCategory] = useState("");

  const nameRef = useRef();
  const caloriesRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(category);

    if (
      nameRef.current.value.trim().length === 0 ||
      caloriesRef.current.value.trim().length === 0 ||
      category === null
    ) {
      toast.error("All fields must be filled!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
    } else {
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
      setCategory("");
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
          required
          label="Name"
          size="small"
          inputRef={nameRef}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          label="Calories"
          size="small"
          inputRef={caloriesRef}
        />
      </div>
      <div>
        <Autocomplete
          getOptionLabel={(option) => option.name}
          clearOnEscape
          options={databaseCategories}
          size="small"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              style={{ width: "41.8ch" }}
            />
          )}
          onChange={(event, value) => setCategory(value)}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "42.8ch" }}
      >
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default FoodForm;
