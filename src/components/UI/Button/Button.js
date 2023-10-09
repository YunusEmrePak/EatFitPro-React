import { useContext } from "react";
import EatFitProContext from "../../../store/context";
import { Button } from "@mui/material";

const ButtonUI = (props) => {
  const context = useContext(EatFitProContext);
  const color = "#084392";
  const backgroundColor = "#084392";
  const controller = props.variant;
  return (
    <Button
      variant="contained"
      onClick={() => {
        (controller === "Form" || controller === "List") &&
          props.onClick(props.name);
      }}
      style={{
        backgroundColor:
          (controller === "Form"
            ? context.currentFormPage
            : context.currentListPage) === props.name ||
          controller === "contained"
            ? backgroundColor
            : "#fff",
        color: !(
          (controller === "Form"
            ? context.currentFormPage
            : context.currentListPage) === props.name ||
          controller === "contained"
        )
          ? color
          : "#fff",
        fontSize: props.fontSize,
        width: props.width,
      }}
      type={props.type}
    >
      {props.name}
    </Button>
  );
};

export default ButtonUI;
