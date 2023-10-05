import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import EatFitProContext from "../../store/context";
const DialogUI = (props) => {
  const context = useContext(EatFitProContext);
  return (
    <Dialog
      onClose={() => {
        context.closeDeleteDialog();
      }}
      open={context.isClickedDeleteButton}
      disablePortal
    >
      <DialogTitle
        style={{ height: "12vh", fontWeight: "bold", fontSize: "1.7vw" }}
      >
        Delete
      </DialogTitle>
      <DialogContent
        style={{ height: "9vh", fontWeight: "bold", fontSize: "1vw" }}
      >
        Are you sure you want to delete this {props.name}?
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={context.closeDeleteDialog}>
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            props.deleteHandler();
            context.setIsClickedDeleteButton(false);
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogUI;
