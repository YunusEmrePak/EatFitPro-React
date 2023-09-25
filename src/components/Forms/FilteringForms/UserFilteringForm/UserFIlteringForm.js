import { Box, Button, TextField } from "@mui/material";
import { useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

import EatFitProContext from "../../../store/context";
import { toast } from "react-toastify";

const UserFilteringForm = () => {
  const context = useContext(EatFitProContext);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const lengthRef = useRef(null);
  const weightRef = useRef(null);
  const sizeRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      surname: surnameRef.current.value ? surnameRef.current.value : null,
      email: emailRef.current.value ? emailRef.current.value : null,
      length: lengthRef.current.value ? lengthRef.current.value : null,
      weight: weightRef.current.value ? weightRef.current.value : null,
    };
    console.log(typeof sizeRef.current.value);
    context.setFilterUserData(data);
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
      <div>
        <TextField required label="Name" size="small" inputRef={nameRef} />
        <TextField
          required
          label="Surname"
          size="small"
          inputRef={surnameRef}
        />
        <TextField
          required
          label="Email"
          size="small"
          type="email"
          inputRef={emailRef}
        />
      </div>
      <div>
        <TextField
          required
          label="Length"
          size="small"
          inputRef={lengthRef}
          type="double"
        />
        <TextField
          required
          label="Weight"
          size="small"
          inputRef={weightRef}
          type="double"
        />
        <TextField
          required
          label="Size"
          size="small"
          inputRef={sizeRef}
          type="number"
        />
      </div>
      <Button variant="contained" type="submit">
        Filter
      </Button>
    </Box>
  );
};

export default UserFilteringForm;
