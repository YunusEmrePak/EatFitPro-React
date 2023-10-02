import { Box, TextField } from "@mui/material";
import { useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import ButtonUI from "../../../UI/Button/Button";

import EatFitProContext from "../../../../store/context";

const ActivityCategoryFilteringForm = (props) => {
  const context = useContext(EatFitProContext);

  const nameRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
    };
    context.setFilterActivityCategoryData(data);
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
          width: 200,
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

export default ActivityCategoryFilteringForm;
