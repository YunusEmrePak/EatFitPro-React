import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Link to="/admin">
        <Button variant="contained">Admin Panel</Button>
      </Link>
    </div>
  );
};

export default Main;
