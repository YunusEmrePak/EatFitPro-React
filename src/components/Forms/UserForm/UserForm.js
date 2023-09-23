import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const lengthRef = useRef();
  const weightRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      nameRef.current.value.trim().length === 0 ||
      surnameRef.current.value.trim().length === 0 ||
      emailRef.current.value.trim().length === 0 ||
      passwordRef.current.value.trim().length === 0 ||
      lengthRef.current.value.trim().length === 0 ||
      weightRef.current.value.trim().length === 0
    ) {
      toast.error("All fields must be filled!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
    } else {
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
        <TextField required label="Name" size="small" inputRef={nameRef} />
        <TextField
          required
          label="Surname"
          size="small"
          inputRef={surnameRef}
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
        />
      </div>
      <div>
        <TextField required label="Length" size="small" inputRef={lengthRef} />
        <TextField required label="Weight" size="small" inputRef={weightRef} />
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
