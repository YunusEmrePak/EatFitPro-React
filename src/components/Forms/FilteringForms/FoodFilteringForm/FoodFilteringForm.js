import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import EatFitProContext from "../../../store/context";
import { toast } from "react-toastify";

const FoodFilteringForm = (props) => {
  const context = useContext(EatFitProContext);
  const [category, setCategory] = useState(null);
  const [databaseCategories, setDatabaseCategories] = useState([]);

  const nameRef = useRef(null);
  const caloriesRef = useRef(null);
  const sizeRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      calories: caloriesRef.current.value ? caloriesRef.current.value : null,
      foodCategoryName: category ? category.name : null,
    };
    context.setFilterFoodData(data);
    props.setPageNumber(1);
    if (sizeRef.current.value === "") {
      context.setFoodListSize(5);
    } else {
      if (sizeRef.current.value > 0) {
        context.setFoodListSize(sizeRef.current.value);
      } else {
        toast.error("Size must be greater than 0", {
          position: "bottom-left",
          draggable: true,
          pauseOnHover: false,
        });
      }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: 380,
          width: 200
        }}
      >
        <div>
          <TextField label="Name" size="small" inputRef={nameRef} />
          <TextField label="Calories" size="small" inputRef={caloriesRef} />
          <Autocomplete
            getOptionLabel={(option) => option.name}
            clearOnEscape
            options={databaseCategories}
            size="small"
            value={category}
            renderInput={(params) => <TextField {...params} label="Category" />}
            onChange={(event, value) => {
              setCategory(value);
            }}
          />
          <TextField
            label="Size"
            size="small"
            inputRef={sizeRef}
            type="number"
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Filter
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default FoodFilteringForm;
