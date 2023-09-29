import { Box, TextField, Slider, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ButtonUI from "../../../UI/Button/Button";

import EatFitProContext from "../../../store/context";

const UserFilteringForm = (props) => {
  const context = useContext(EatFitProContext);

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);

  const [lengthRange, setLengthRange] = useState([150, 200]);
  const [weightRange, setWeightRange] = useState([60, 100]);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value ? nameRef.current.value : null,
      surname: surnameRef.current.value ? surnameRef.current.value : null,
      email: emailRef.current.value ? emailRef.current.value : null,
      lengthLowerBound: lengthRange[0],
      lengthUpperBound: lengthRange[1],
      weightLowerBound: weightRange[0],
      weightUpperBound: weightRange[1],
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
          <div style={{ padding: "4px 12px" }}>
            <Typography id="length-slider" gutterBottom>
              Length
            </Typography>
            <Slider
              label="Length"
              value={lengthRange}
              onChange={(event, newValue) => setLengthRange(newValue)}
              valueLabelDisplay="auto"
              min={100}
              max={230}
              style={{width: "170px" }}
            />
          </div>
          <div style={{ padding: "4px 12px" }}>
            <Typography id="length-slider" gutterBottom>
              Weight
            </Typography>
            <Slider
              label="Weight"
              value={weightRange}
              onChange={(event, newValue) => setWeightRange(newValue)}
              valueLabelDisplay="auto"
              min={30}
              max={200}
              style={{ width: "170px" }}
            />
          </div>

        </div>
        <div>
          <ButtonUI name="Filter" variant="contained" type="submit" />
        </div>
      </div>
    </Box>
  );
};

export default UserFilteringForm;
