import { Box, Button, TextField } from "@mui/material";
import { useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

import EatFitProContext from "../../../store/context";
import { toast } from "react-toastify";

const FoodFilteringForm = (props) => {
  const context = useContext(EatFitProContext);

  const nameRef = useRef(null);
  const caloriesRef = useRef(null);
  const foodCategoryRef = useRef(null);
  const sizeRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      calories: caloriesRef.current.value ? caloriesRef.current.value : null,
      foodCategoryName: foodCategoryRef.current.value ? foodCategoryRef.current.value : null,
    };
    context.setFilterUserData(data);
    props.setPageNumber(1);
    if (sizeRef.current.value === "") {
      context.setUserListSize(5);
    } else {
      if (sizeRef.current.value > 0) {
        context.setUserListSize(sizeRef.current.value);
      } else {
        toast.error("Size must be greater than 0", {
          position: "bottom-left",
          draggable: true,
          pauseOnHover: false,
        });
      }
    }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField label="Name" size="small" inputRef={nameRef} />
        <TextField label="Calories" size="small" inputRef={surnameRef} />
        <TextField
          label="Category"
          size="small"
          type="email"
          inputRef={emailRef}
        />
        <TextField label="Size" size="small" inputRef={sizeRef} type="number" />
        <Button variant="contained" type="submit">
          Filter
        </Button>
      </div>
    </Box>
  );
};

export default FoodFilteringForm;
