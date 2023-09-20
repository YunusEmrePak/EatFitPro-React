import { useRef, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import Swal from "sweetalert2";

const FoodForm = () => {
  const [foodData, setFoodData] = useState([]);

  const nameRef = useRef();
  const caloriesRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      calories: caloriesRef.current.value,
    }

    setFoodData(data);
    Swal.fire("Data is added", "Correctly!", "success");
  }
  console.log(foodData);

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
          id="outlined-required"
          label="Name"
          size="small"
          inputRef={nameRef}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Calories"
          size="small"
          inputRef={caloriesRef}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "42.8ch" }}
      >
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </Box>
  );
};

export default FoodForm;
