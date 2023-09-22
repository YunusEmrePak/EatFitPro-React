import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import AddingPage from "../AdminPages/AddingPage/AddingPage";
import ListingPage from "../AdminPages/ListingPage/ListingPage";
import AddingFormController from "../Controller/FormController/AddingFormController";
import ListingController from "../Controller/ListController/ListingController";
import PageController from "../Controller/PageController/PageController";
import EatFitProContext from "../store/context";

import Logo from "../constants/Logo";
import MainPage from "../AdminPages/MainPage/MainPage";

const drawerWidth = 240;

const AdminPanel = () => {
  const context = useContext(EatFitProContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {context.pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Logo />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Segoe UI",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EatFitPro
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <PageController />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar>
          {(context.addingPageVisible && <AddingFormController />) ||
            (context.listingPageVisible && <ListingController />)}
        </Toolbar>
        {(context.mainPageVisible && <MainPage />) ||
          (context.addingPageVisible && <AddingPage />) ||
          (context.listingPageVisible && <ListingPage />)}
      </Box>
    </Box>
  );
};

export default AdminPanel;

/* <div>
      <PageController
        showAddingPage={showAddingPage}
        showListingPage={showListingPage}
        addingPageVisible={addingPageVisible}
        listingPageVisible={listingPageVisible}
      />
      {(addingPageVisible && <AddingPage />) ||
        (listingPageVisible && <ListingPage />)}
    </div> */
