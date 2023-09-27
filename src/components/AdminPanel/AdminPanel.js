import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AddingPage from "../AdminPages/AddingPage/AddingPage";
import ListingPage from "../AdminPages/ListingPage/ListingPage";
import AddingFormController from "../Controller/FormController/AddingFormController";
import ListingController from "../Controller/ListController/ListingController";
import PageController from "../Controller/PageController/PageController";
import EatFitProContext from "../store/context";

import MainPage from "../AdminPages/MainPage/MainPage";
import Logo from "../constants/Logo";

const drawerWidth = 320;
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AdminPanel = () => {
  const context = useContext(EatFitProContext);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{ backgroundColor: "white" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "#084392" }}
          >
            {context.pageName}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                  style={{ color: "#fff", backgroundColor: "#084392" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer // Logo and left part
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#042A5D",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Logo />
        <List>
          <PageController />
        </List>
      </Drawer>
      <Box // Toolboxes
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, marginTop: 8 }}
      >
        <Toolbar>
          {(context.addingPageVisible && <AddingFormController />) ||
            (context.listingPageVisible && <ListingController />)}
        </Toolbar>
        <Toolbar>
          {(context.mainPageVisible && <MainPage />) ||
            (context.addingPageVisible && <AddingPage />) ||
            (context.listingPageVisible && <ListingPage />)}
        </Toolbar>
      </Box>
    </Box>
  );
};

export default AdminPanel;
