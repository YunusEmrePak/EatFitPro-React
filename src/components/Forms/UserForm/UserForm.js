import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const lengthRef = useRef();
  const weightRef = useRef();

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [weightError, setWeightError] = useState(false);

  const errorHandler = () => {
    let errorCounter = 0;
    if (nameRef.current.value.trim().length === 0) {
      setNameError(true);
      errorCounter += 1;
    }
    if (surnameRef.current.value.trim().length === 0) {
      setSurnameError(true);
      errorCounter += 1;
    }
    if (emailRef.current.value.trim().length === 0) {
      setEmailError(true);
      errorCounter += 1;
    }
    if (passwordRef.current.value.trim().length === 0) {
      setPasswordError(true);
      errorCounter += 1;
    }
    if (lengthRef.current.value.trim().length === 0) {
      setLengthError(true);
      errorCounter += 1;
    }
    if (weightRef.current.value.trim().length === 0) {
      setWeightError(true);
      errorCounter += 1;
    }
    if (errorCounter !== 0) {
      toast.error("All fields must be filled!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
      errorCounter = 0;
      return true;
    }
    if (errorCounter === 0) {
      return false;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!errorHandler()) {
      const data = {
        name: nameRef.current.value,
        surname: surnameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        length: lengthRef.current.value,
        weight: weightRef.current.value,
      };

      const dataJSON = JSON.stringify(data);

      const url = "http://localhost:8080/user/add";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJSON,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          console.log(data);
        });

      nameRef.current.value = "";
      surnameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      lengthRef.current.value = "";
      weightRef.current.value = "";

      toast.success("Data is added correctly!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
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
        <TextField
          required
          label="Name"
          size="small"
          inputRef={nameRef}
          error={nameError ? true : false}
          onChange={() => {
            setNameError(false);
          }}
        />
        <TextField
          required
          label="Surname"
          size="small"
          inputRef={surnameRef}
          error={surnameError ? true : false}
          onChange={() => {
            setSurnameError(false);
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          label="Email"
          size="small"
          type="email"
          inputRef={emailRef}
          error={emailError ? true : false}
          onChange={() => {
            setEmailError(false);
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          label="Password"
          size="small"
          type="password"
          inputRef={passwordRef}
          error={passwordError ? true : false}
          onChange={() => {
            setPasswordError(false);
          }}
        />
      </div>
      <div>
        <TextField
          required
          label="Length"
          size="small"
          inputRef={lengthRef}
          error={lengthError ? true : false}
          onChange={() => {
            setLengthError(false);
          }}
        />
        <TextField
          required
          label="Weight"
          size="small"
          inputRef={weightRef}
          error={weightError ? true : false}
          onChange={() => {
            setWeightError(false);
          }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "42.8ch" }}
      >
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default UserForm;
