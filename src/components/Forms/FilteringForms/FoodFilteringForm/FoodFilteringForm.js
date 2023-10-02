import { Autocomplete, Box, TextField, Slider, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ButtonUI from "../../../UI/Button/Button";

import EatFitProContext from "../../../../store/context";

const FoodFilteringForm = (props) => {
  const context = useContext(EatFitProContext);
  const [category, setCategory] = useState(null);
  const [databaseCategories, setDatabaseCategories] = useState([]);

  const nameRef = useRef(null);

  const [calorieRange, setCalorieRange] = useState([30, 800]);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      caloriesLowerBound: calorieRange[0],
      caloriesUpperBound: calorieRange[1],
      foodCategoryName: category ? category.name : null,
    };
    context.setFilterFoodData(data);
    props.setPageNumber(1);
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
          height: 370,
          width: 200,
          marginTop: 20,
        }}
      >
        <div>
          <TextField label="Name" size="small" inputRef={nameRef} />
          <div style={{ marginLeft: 10 }}>
            <Typography id="calorie-slider" gutterBottom>
              Calories
            </Typography>
            <Slider
              label="Calories"
              value={calorieRange}
              onChange={(event, newValue) => setCalorieRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={3000}
              style={{width: "170px" }}
            />
          </div>
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
        </div>
        <div>
          <ButtonUI name="Filter" variant="contained" type="submit" />
        </div>
      </div>
    </Box>
  );
};

export default FoodFilteringForm;
