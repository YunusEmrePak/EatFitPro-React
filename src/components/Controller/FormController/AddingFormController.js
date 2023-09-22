import { useContext } from "react";
import EatFitProContext from "../../store/context";

import Button from "@mui/material/Button";

import styles from "./AddingFormController.module.css";

const AddingFormController = (props) => {
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
      <Button variant="outlined" disabled>
        Activity
      </Button>
    </div>
  );
};

export default AddingFormController;
