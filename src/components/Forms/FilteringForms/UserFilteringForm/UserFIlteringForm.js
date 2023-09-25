import { Box, Button, TextField } from "@mui/material";
import { useRef, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EatFitProContext from "../../../store/context";

const UserFilteringForm = () => {
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

    // const dataJSON = JSON.stringify(data);

    // const url = "http://localhost:8080/user/get/filtered";

    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: dataJSON,
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     context.setFilteredUserData(data.content);
    //     console.log(data.content);
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })

    // nameRef.current.value = "";
    // surnameRef.current.value = "";
    // emailRef.current.value = "";
    // lengthRef.current.value = "";
    // weightRef.current.value = "";

    toast.success("Data is added correctly!", {
      position: "bottom-left",
      draggable: true,
      pauseOnHover: false,
    });
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
      </div>
      <Button variant="contained" type="submit">
        Filter
      </Button>
    </Box>
  );
};

export default UserFilteringForm;
