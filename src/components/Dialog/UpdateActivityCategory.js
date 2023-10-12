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
  const UpdateActivityCategory = (props) => {
    const context = useContext(EatFitProContext);
    const nameRef = useRef();
  
    const submitHandler = async (event) => {
      event.preventDefault();
      if (nameRef.current.value.trim().length === 0) {
        toast.error("All fields must be filled!", {
          position: "bottom-left",
          draggable: true,
          pauseOnHover: false,
        });
      } else {
        const data = {
          name: nameRef.current.value,
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
                style={{ width: "41.8ch" }}
                label="Name"
                size="small"
                inputRef={nameRef}
                defaultValue={context.updatingItem.name}
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
  
  export default UpdateActivityCategory;
  