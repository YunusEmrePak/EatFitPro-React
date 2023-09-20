import Button from "@mui/material/Button";

import styles from "./FormController.module.css";

const FormController = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className={styles.formControllerContainer}
    >
      <div style={{marginBottom: "1rem"}}>Adding Panel</div>
      <Button variant="outlined">User</Button>
      <Button variant="outlined" disabled>
        Food
      </Button>
      <Button variant="outlined" disabled>
        Activity
      </Button>
    </div>
  );
};

export default FormController;
