import Button from "@mui/material/Button";

import styles from "./ListingController.module.css";

const ListingFormController = (props) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className={styles.listControllerContainer}
    >
      <div style={{ marginBottom: "1rem" }}>Listing Panel</div>
      <Button
        variant={props.userListVisible ? "contained" : "outlined"}
        onClick={props.showUserList}
      >
        User
      </Button>
      <Button variant={props.foodListVisible ? "contained" : "outlined"} onClick={props.showFoodList}>
        Food
      </Button>
      <Button variant="outlined" disabled>
        Activity
      </Button>
    </div>
  );
};

export default ListingFormController;
