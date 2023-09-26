import { useContext } from "react";
import EatFitProContext from "../../store/context";

import Button from "@mui/material/Button";

import styles from "./ListingController.module.css";

const ListingController = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.listControllerContainer}>
      <Button
        variant={context.userListVisible ? "contained" : "outlined"}
        onClick={context.showUserList}
      >
        User
      </Button>
      <Button
        variant={context.foodListVisible ? "contained" : "outlined"}
        onClick={context.showFoodList}
      >
        Food
      </Button>
      <Button
        variant={context.foodCategoryListVisible ? "contained" : "outlined"}
        onClick={context.showFoodCategoryList}
      >
        Food Category
      </Button>

      <Button
        variant={context.activityListVisible ? "contained" : "outlined"}
        onClick={context.showActivityList}
      >
        Activity
      </Button>
      <Button
        variant={context.activityCategoryListVisible ? "contained" : "outlined"}
        onClick={context.showActivityCategoryList}
      >
        Activity Category
      </Button>
      <Button
        variant={context.foodAndActivityAssignmentListVisible ? "contained" : "outlined"}
        onClick={context.showFoodAndActivityAssignmentList}
      >
        Food And Activity Assignment
      </Button>
    </div>
  );
};

export default ListingController;
