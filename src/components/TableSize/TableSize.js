import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import EatFitProContext from "../../store/context";

const TableSize = (props) => {
  const context = useContext(EatFitProContext);
  const checkTableName = (name, value) => {
    if (name === "user") {
      context.setUserListSize(value);
    }
    if (name === "food") {
      context.setFoodListSize(value);
    }
    if (name === "food category") {
      context.setFoodCategoryListSize(value);
    }
    if (name === "activity") {
      context.setActivityListSize(value);
    }
    if (name === "activity category") {
      context.setActivityCategoryListSize(value);
    }
    if (name === "food and activity assignment") {
      context.setFoodAndActivityAssignmentListSize(value);
    }
  };

  const checkDefaultValue = () => {
    if (props.name === "user") {
      return context.userListSize;
    }
    if (props.name === "food") {
      return context.foodListSize;
    }
    if (props.name === "food category") {
      return context.foodCategoryListSize;
    }
    if (props.name === "activity") {
      return context.activityListSize;
    }
    if (props.name === "activity category") {
      return context.activityCategoryListSize;
    }
    if (props.name === "food and activity assignment") {
      return context.foodAndActivityAssignmentListSize;
    }
  };

  return (
    <FormControl>
      <InputLabel>Size</InputLabel>
      <Select
        defaultValue={checkDefaultValue}
        size="small"
        label="Size"
        style={{ width: "12ch" }}
        onChange={(event) => {
          checkTableName(props.name, event.target.value);
          props.setPageNumber(1);
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TableSize;
