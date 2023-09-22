import { useContext } from "react";
import EatFitProContext from "../../store/context";

import Button from "@mui/material/Button";

import styles from "./ListingController.module.css";

const ListingController = (props) => {
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
      <Button variant="outlined" disabled>
        Activity
      </Button>
    </div>
  );
};

export default ListingController;
