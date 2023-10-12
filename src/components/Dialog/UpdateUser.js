import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

import React, { useContext, useRef } from "react";
import EatFitProContext from "../../store/context";
const UpdateUser = (props) => {
  const context = useContext(EatFitProContext);
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const lengthRef = useRef();
  const weightRef = useRef();
  
  const errorHandler = () => {
    let errorCounter = 0;
    if (
      nameRef.current.value.trim().length === 0 ||
      !/^[A-Za-z]+$/.test(nameRef.current.value)
    ) {
      errorCounter += 1;
    }
    if (
      surnameRef.current.value.trim().length === 0 ||
      !/^[A-Za-z]+$/.test(surnameRef.current.value)
    ) {
      errorCounter += 1;
    }
    if (emailRef.current.value.trim().length === 0) {
      errorCounter += 1;
    }
    if (lengthRef.current.value.trim().length === 0) {
      errorCounter += 1;
    }
    if (weightRef.current.value.trim().length === 0) {
      errorCounter += 1;
    }
    if (errorCounter !== 0) {
      toast.error(
        "All fields must be filled, name and surname must not include number. Please check your entries!",
        {
          position: "bottom-left",
          draggable: true,
          pauseOnHover: false,
        }
      );
      errorCounter = 0;
      return true;
    }
    if (errorCounter === 0) {
      return false;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!errorHandler()) {
      const data = {
        name: nameRef.current.value,
        surname: surnameRef.current.value,
        email: emailRef.current.value,
        length: lengthRef.current.value,
        weight: weightRef.current.value,
      };
      props.updateHandler(data);
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
      <Dialog
        onClose={() => {
          context.closeUpdateDialog();
        }}
        open={context.isClickedUpdateButton}
        disablePortal
      >
        <DialogTitle style={{ marginLeft: 10 }}>
          {context.updatingItem.name +
            " " +
            context.updatingItem.surname +
            "'s Information"}
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Name"
              size="small"
              type="text"
              defaultValue={context.updatingItem.name}
              inputRef={nameRef}
              inputProps={{
                pattern: "[A-Za-z]+",
              }}
            />
            <TextField
              label="Surname"
              size="small"
              defaultValue={context.updatingItem.surname}
              inputRef={surnameRef}
            />
          </div>
          <div>
            <TextField
              style={{ width: "41.8ch" }}
              label="Email"
              size="small"
              type="email"
              defaultValue={context.updatingItem.email}
              inputRef={emailRef}
            />
          </div>
          <div>
            <TextField
              label="Length"
              size="small"
              type="number"
              defaultValue={context.updatingItem.length}
              inputRef={lengthRef}
            />
            <TextField
              label="Weight"
              size="small"
              type="number"
              defaultValue={context.updatingItem.weight}
              inputProps={{
                maxLength: 13,
                step: "1",
              }}
              inputRef={weightRef}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={context.closeUpdateDialog}>
            Exit
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            onClick={() => {
              context.setIsClickedUpdateButton(false);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateUser;
