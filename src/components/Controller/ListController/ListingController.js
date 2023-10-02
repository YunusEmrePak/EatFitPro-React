import { useContext } from "react";
import EatFitProContext from "../../../store/context";

import ButtonUI from "../../UI/Button/Button";

// import styles from "./ListingController.module.css";

const ListingController = () => {
  const context = useContext(EatFitProContext);

  const buttons = [
    {
      name: "User",
      variant: context.userListVisible,
      click: context.showUserList,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food",
      variant: context.foodListVisible,
      click: context.showFoodList,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food Category",
      variant: context.foodCategoryListVisible,
      click: context.showFoodCategoryList,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity",
      variant: context.activityListVisible,
      click: context.showActivityList,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity Category",
      variant: context.activityCategoryListVisible,
      click: context.showActivityCategoryList,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food And Activity Assignment",
      variant: context.foodAndActivityAssignmentListVisible,
      click: context.showFoodAndActivityAssignmentList,
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

export default ListingController;
