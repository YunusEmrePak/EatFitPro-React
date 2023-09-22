import HomeIcon from '@mui/icons-material/Home';
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useContext } from "react";
import EatFitProContext from "../../store/context";

import styles from "./PageController.module.css";

const PageController = (props) => {
  const context = useContext(EatFitProContext);
  return (
    <div className={styles.pageControllerContainer}>
      <ListItem disablePadding>
        <ListItemButton onClick={context.showMainPage} >
          <ListItemIcon>
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Main Page" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={context.showAddingPage} >
          <ListItemIcon>
            <AddIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Adding Page" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={context.showListingPage} >
          <ListItemIcon>
            <ListIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Listing Page" />
        </ListItemButton>
      </ListItem>
      {/* <Button
        variant={props.addingPageVisible ? "contained" : "outlined"}
        onClick={props.showAddingPage}
        fullWidth
      >
        Adding Page
      </Button>
      <Button
        variant={props.listingPageVisible ? "contained" : "outlined"}
        onClick={props.showListingPage}
        fullWidth
      >
        Listing Page
      </Button> */}
    </div>
  );
};

export default PageController;
