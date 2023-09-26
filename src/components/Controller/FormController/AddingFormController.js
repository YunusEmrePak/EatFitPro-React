import { useContext } from "react";
import EatFitProContext from "../../store/context";

import Button from "@mui/material/Button";

import styles from "./AddingFormController.module.css";

const AddingFormController = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.formControllerContainer}>
      <Button
        variant={context.userFormVisible ? "contained" : "outlined"}
        onClick={context.showUserForm}
      >
        User
      </Button>
      <Button
        variant={context.foodFormVisible ? "contained" : "outlined"}
        onClick={context.showFoodForm}
      >
        Food
      </Button>
      <Button
        variant={context.foodCategoryFormVisible ? "contained" : "outlined"}
        onClick={context.showFoodCategoryForm}
      >
        Food Category
      </Button>

      <Button
        variant={context.activityFormVisible ? "contained" : "outlined"}
        onClick={context.showActivityForm}
      >
        Activity
      </Button>
      <Button
        variant={context.activityCategoryFormVisible ? "contained" : "outlined"}
        onClick={context.showActivityCategoryForm}
      >
        Activity Category
      </Button>
      <Button
        variant={context.foodAndActivityAssignmentFormVisible ? "contained" : "outlined"}
        onClick={context.showFoodAndActivityAssignmentForm}
      >
        Food And Activity Assignment
      </Button>
    </div>
  );
};

export default AddingFormController;
