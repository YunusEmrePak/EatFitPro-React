import { Box, Button, TextField } from "@mui/material";
import { useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

import EatFitProContext from "../../../store/context";
import { toast } from "react-toastify";

const UserFilteringForm = (props) => {
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
          justifyContent: "space-between",
          alignItems: "center",
          height: 380,
          width: 200
        }}
      >
        <div>
          <TextField label="Name" size="small" inputRef={nameRef} />
          <TextField label="Surname" size="small" inputRef={surnameRef} />
          <TextField
            label="Email"
            size="small"
            type="email"
            inputRef={emailRef}
          />
          <TextField
            label="Length"
            size="small"
            inputRef={lengthRef}
            type="double"
          />
          <TextField
            label="Weight"
            size="small"
            inputRef={weightRef}
            type="double"
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

export default UserFilteringForm;
