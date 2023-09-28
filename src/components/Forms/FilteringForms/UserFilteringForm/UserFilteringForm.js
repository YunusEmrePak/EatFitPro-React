import { Box, TextField } from "@mui/material";
import { useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import ButtonUI from "../../../UI/Button/Button";

import EatFitProContext from "../../../store/context";

const UserFilteringForm = (props) => {
  const context = useContext(EatFitProContext);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const lengthRef = useRef(null);
  const weightRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      surname: surnameRef.current.value ? surnameRef.current.value : null,
      email: emailRef.current.value ? emailRef.current.value : null,
      length: lengthRef.current.value ? lengthRef.current.value : null,
      weight: weightRef.current.value ? weightRef.current.value : null,
    };
    context.setFilterUserData(data);
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
          <TextField label="Surname" size="small" inputRef={surnameRef} />
          <TextField
            label="Email"
            size="small"
            inputRef={emailRef}
          />
          <TextField
            label="Length"
            size="small"
            inputRef={lengthRef}
            type="number"
          />
          <TextField
            label="Weight"
            size="small"
            inputRef={weightRef}
            type="number"
          />
        </div>
        <div>
          <ButtonUI name="Filter" variant="contained" type="submit" />
        </div>
      </div>
    </Box>
  );
};

export default UserFilteringForm;
