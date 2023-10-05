import { FormControl, MenuItem, Select } from "@mui/material";
// label={props.name}
const SelectMenu = (props) => {
  const data = props.data;
  return (
    <FormControl>
      {/* <InputLabel style={{fontSize: 14}}>{props.name}</InputLabel> */}
      <Select size="small" style={{ width: "16ch" }}>
        {data.map((value) => {
          return <MenuItem key={value.id}>{value.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
