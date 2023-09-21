import Button from "@mui/material/Button";

import styles from "./PageController.module.css";

const PageController = (props) => {
  return (
    <div className={styles.pageControllerContainer}>
      <Button
        variant={props.addingPageVisible ? "contained" : "outlined"}
        onClick={props.showAddingPage}
      >
        Adding Page
      </Button>
      <Button
        variant={props.listingPageVisible ? "contained" : "outlined"}
        onClick={props.showListingPage}
      >
        Listing Page
      </Button>
    </div>
  );
};

export default PageController;
