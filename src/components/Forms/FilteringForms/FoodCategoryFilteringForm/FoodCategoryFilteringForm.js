import { useContext, useRef } from "react";
import EatFitProContext from "../../../../store/context";

import { Box, TextField } from "@mui/material";

import ButtonUI from "../../../UI/Button/Button";

const FoodCategoryFilteringForm = (props) => {
  const context = useContext(EatFitProContext);

  const nameRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
    };
    context.setFilterFoodCategoryData(data);
    props.setPageNumber(1);
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
          justifyContent: "space-between",
          alignItems: "center",
          height: 370,
          width: 190,
          marginTop: 20,
        }}
      >
        <div>
          <TextField label="Name" size="small" inputRef={nameRef} />
        </div>
        <div>
          <ButtonUI name="Filter" variant="contained" type="submit" />
        </div>
      </div>
    </Box>
  );
};

export default FoodCategoryFilteringForm;
