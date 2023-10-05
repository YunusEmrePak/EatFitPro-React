import { useContext } from "react";
import EatFitProContext from "../../../store/context";

import ButtonUI from "../../UI/Button/Button";

import "./AddingFormController.css";

const AddingFormController = () => {
  const context = useContext(EatFitProContext);

  const buttons = [
    {
      name: "User",
      click: context.changeFormPage,
      variant: "Form",
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food",
      click: context.changeFormPage,
      variant: "Form",
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food Category",
      click: context.changeFormPage,
      variant: "Form",
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity",
      click: context.changeFormPage,
      variant: "Form",
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity Category",
      click: context.changeFormPage,
      variant: "Form",
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food And Activity Assignment",
      click: context.changeFormPage,
      variant: "Form",
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
  ];

  return (
    <div>
      {buttons.map((value) => {
        return (
          <ButtonUI
            key={value.name}
            name={value.name}
            variant={value.variant}
            onClick={value.click}
            style={value.style}
          />
        );
      })}
    </div>
  );
};

export default AddingFormController;


/* <ButtonUI
            name={value.name}
            variant={value.variant ? "contained" : "outlined"}
            onClick={value.click}
            style={{
              backgroundColor: value.variant
                ? value.style.backgroundColor
                : "#fff",
              color: !value.variant ? value.style.color : "#fff",
            }}
          /> */
