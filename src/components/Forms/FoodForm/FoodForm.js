import { useEffect, useRef, useState } from "react";
import { Button, Box, TextField, Autocomplete } from "@mui/material";
import Swal from "sweetalert2";

const FoodForm = () => {
  const [foodData, setFoodData] = useState([]);
  const [databaseCategories, setDatabaseCategories] = useState([]);
  const [category, setCategory] = useState("");

  const nameRef = useRef();
  const caloriesRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      calories: caloriesRef.current.value,
      foodCategory: {
        id: category.id
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

    console.log(data);
    Swal.fire("Data is added", "Correctly!", "success");
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
        console.log(data);
        setDatabaseCategories(data);
      });
  }, []);

  const top100Films = [
    { name: "The Shawshank Redemption" },
    { name: "The Godfather" },
    { name: "The Godfather: Part II" },
    { name: "The Dark Knight" },
    { name: "12 Angry Men" },
    { name: "Schindler's List" },
  ];

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
          // {...defaultProps}
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
          // isOptionEqualToValue={(option) => option.name = category.name}
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
