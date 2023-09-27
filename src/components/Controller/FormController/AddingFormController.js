import { useContext } from "react";
import EatFitProContext from "../../store/context";

import ButtonUI from "../../UI/Button/Button";

import "./AddingFormController.css";

const AddingFormController = () => {
  const context = useContext(EatFitProContext);

  const buttons = [
    {
      name: "User",
      variant: context.userFormVisible,
      click: context.showUserForm,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food",
      variant: context.foodFormVisible,
      click: context.showFoodForm,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food Category",
      variant: context.foodCategoryFormVisible,
      click: context.showFoodCategoryForm,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity",
      variant: context.activityFormVisible,
      click: context.showActivityForm,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity Category",
      variant: context.activityCategoryFormVisible,
      click: context.showActivityCategoryForm,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food And Activity Assignment",
      variant: context.foodAndActivityAssignmentFormVisible,
      click: context.showFoodAndActivityAssignmentForm,
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
