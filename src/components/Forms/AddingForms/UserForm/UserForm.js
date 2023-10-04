import { useRef, useState } from "react";

import { Box, TextField } from "@mui/material";
import ButtonUI from "../../../UI/Button/Button";
import { toast } from "react-toastify";

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
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  const errorHandler = () => {
    let errorCounter = 0;
    if (
      nameRef.current.value.trim().length === 0 ||
      !/^[A-Za-z]+$/.test(nameRef.current.value)
    ) {
      setNameError(true);
      errorCounter += 1;
    }
    if (
      surnameRef.current.value.trim().length === 0 ||
      !/^[A-Za-z]+$/.test(surnameRef.current.value)
    ) {
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

  const fetchData = async (dataJSON) => {
    const url = "http://localhost:8080/user/add";

    await fetch(url, {
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
      })
      .catch((error) => {
        console.log(error);
        setIsDatabaseConnected(false);
        toast.error("Server Error", {
          position: "bottom-left",
          draggable: true,
          pauseOnHover: false,
        });
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(isDatabaseConnected);

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

      fetchData(dataJSON);

      nameRef.current.value = "";
      surnameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      lengthRef.current.value = "";
      weightRef.current.value = "";

      if (isDatabaseConnected) {
        toast.success("Data is added correctly!", {
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
        <TextField
          label="Name"
          size="small"
          type="text"
          inputRef={nameRef}
          error={nameError ? true : false}
          inputProps={{
            pattern: "[A-Za-z]+",
          }}
          onChange={() => {
            setNameError(false);
          }}
        />
        <TextField
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
          label="Length"
          size="small"
          type="number"
          inputRef={lengthRef}
          error={lengthError ? true : false}
          onChange={() => {
            setLengthError(false);
          }}
        />
        <TextField
          label="Weight"
          size="small"
          type="number"
          inputProps={{
            maxLength: 13,
            step: "1",
          }}
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
        <ButtonUI name="Add" variant="contained" type="submit" />
      </div>
    </Box>
  );
};

export default UserForm;
