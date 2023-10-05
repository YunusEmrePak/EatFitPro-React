import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import EatFitProContext from "../../../store/context";

import styles from "./PageController.module.css";

const PageController = () => {
  const context = useContext(EatFitProContext);
  return (
    <div className={styles.pageControllerContainer}>
      <ListItem disablePadding className={styles.hover}>
        <ListItemButton
          onClick={() => {
            context.changePage("Main");
            context.setPageName("Main Page");
          }}
        >
          <ListItemIcon>
            <HomeIcon fontSize="large" style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                Main Page
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding className={styles.hover}>
        <ListItemButton
          onClick={() => {
            context.changePage("Adding");
            context.setPageName("Adding Page");
          }}
        >
          <ListItemIcon>
            <AddIcon fontSize="large" style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                Adding Page
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding className={styles.hover}>
        <ListItemButton
          onClick={() => {
            context.changePage("Listing");
            context.setPageName("Listing Page");
          }}
        >
          <ListItemIcon>
            <ListIcon fontSize="large" style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                Listing Page
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default PageController;
