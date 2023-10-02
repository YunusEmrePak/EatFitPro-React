import { useRef, useState } from "react";

import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import ButtonUI from "../../../UI/Button/Button";

const ActivityCategoryForm = () => {
  const nameRef = useRef();

  const [nameError, setNameError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    if (nameRef.current.value.trim().length === 0) {
      toast.error("All fields must be filled!", {
        position: "bottom-left",
        draggable: true,
        pauseOnHover: false,
      });
      setNameError(true);
    } else {
      setNameError(false);
      const data = {
        name: nameRef.current.value,
      };

      const dataJSON = JSON.stringify(data);

      const url = "http://localhost:8080/activityCategory/add";

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
          style={{ width: "41.8ch" }}
          label="Name"
          size="small"
          inputRef={nameRef}
          error={nameError ? true : false}
          onChange={() => {
            setNameError(false);
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

export default ActivityCategoryForm;
