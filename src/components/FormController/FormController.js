import { useState } from "react";
import Button from "@mui/material/Button";

import styles from "./FormController.module.css";

const FormController = (props) => {
  const [variant, setVariant] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className={styles.formControllerContainer}
    >
      <div style={{ marginBottom: "1rem" }}>Adding Panel</div>
      <Button
        variant={props.userFormVisible ? "contained" : "outlined"}
        onClick={props.showUserForm}
      >
        User
      </Button>
      <Button variant={props.foodFormVisible ? "contained" : "outlined"} onClick={props.showFoodForm}>
        Food
      </Button>
      <Button variant="outlined" disabled>
        Activity
      </Button>
    </div>
  );
};

export default FormController;
