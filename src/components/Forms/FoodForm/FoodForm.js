import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const FoodForm = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Name"
          size="small"
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Calories"
          size="small"
        />
      </div>
    </Box>
  );
};

export default FoodForm;
