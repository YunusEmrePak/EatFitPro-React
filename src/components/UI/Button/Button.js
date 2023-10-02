import { Button } from "@mui/material";

const ButtonUI = (props) => {
  const color = "#084392";
  const backgroundColor = "#084392";
  return (
    <Button
      variant={props.variant ? "contained" : "outlined"}
      onClick={props.onClick}
      style={{
        backgroundColor: props.variant ? backgroundColor : "#fff",
        color: !props.variant ? color : "#fff",
        fontSize: props.fontSize,
        width: props.width
      }}
      type={props.type}
    >
      {props.name}
    </Button>
  );
};

export default ButtonUI;
