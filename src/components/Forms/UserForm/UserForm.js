import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const UserForm = () => {
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
        <TextField required id="outlined-required" label="Name" size="small" />
        <TextField
          required
          id="outlined-required"
          label="Surname"
          size="small"
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Email"
          size="small"
        />
      </div>
      <div>
        <TextField
          style={{ width: "41.8ch" }}
          required
          id="outlined-required"
          label="Password"
          size="small"
          type="password"
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Length"
          size="small"
        />
        <TextField
          required
          id="outlined-required"
          label="Weight"
          size="small"
        />
      </div>
    </Box>
  );
};

export default UserForm;
