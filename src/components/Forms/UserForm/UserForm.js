import { useRef, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import Swal from "sweetalert2";

const UserForm = () => {
  const [userData, setUserData] = useState([]);
  // const [nameError, setNameError] = useState(false);
  // const [surnameError, setSurnameError] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [lengthError, setLengthError] = useState(false);
  // const [weigthError, setWeightError] = useState(false);

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const lengthRef = useRef();
  const weightRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      length: lengthRef.current.value,
      weight: weightRef.current.value,
    };
    setUserData(data);

    Swal.fire("Data is added", "Correctly!", "success");
  };
  console.log(userData);

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
          id="outlined-required"
          label="Name"
          size="small"
          inputRef={nameRef}
          // helperText={nameError && "Incorrect entry"}
        />
        <TextField
          required
          id="outlined-required"
          label="Surname"
          size="small"
          inputRef={surnameRef}
          // helperText={surnameError && "Incorrect entry"}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Email"
          size="small"
          type="email"
          inputRef={emailRef}
          // helperText={emailError && "Incorrect entry"}
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Password"
          size="small"
          type="password"
          inputRef={passwordRef}
          // helperText={passwordError && "Incorrect entry"}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Length"
          size="small"
          inputRef={lengthRef}
          // helperText={lengthError && "Incorrect entry"}
        />
        <TextField
          required
          id="outlined-required"
          label="Weight"
          size="small"
          inputRef={weightRef}
          // helperText={weigthError && "Incorrect entry"}
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

// if (nameRef.current.value.trim().length === 0) {
//   setNameError(true);
// }
// if (surnameRef.current.value.trim().length === 0) {
//   setSurnameError(true);
// }
// if (emailRef.current.value.trim().length === 0) {
//   setEmailError(true);
// }
// if (passwordRef.current.value.trim().length === 0) {
//   setPasswordError(true);
// }
// if (lengthRef.current.value.trim().length === 0) {
//   setLengthError(true);
// }
// if (weightRef.current.value.trim().length === 0) {
//   setWeightError(true);
// }
// setNameError(false);
// setSurnameError(false);
// setEmailError(false);
// setPasswordError(false);
// setLengthError(false);
// setWeightError(false);
