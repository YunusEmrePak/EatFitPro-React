import {
  Toolbar,
  Typography
} from "@mui/material";
import logo from "../../assets/Images/EFPlogo2.png";

const Logo = () => {
  return (
    <Toolbar>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "2.8rem", borderRadius: "10%", marginRight: ".7rem" }}
      />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Helvetica",
          fontWeight: 700,
          letterSpacing: ".2rem",
          textDecoration: "none",
          color: "white",
        }}
      >
        EATFITPRO
      </Typography>
    </Toolbar>
  );
};

export default Logo;
