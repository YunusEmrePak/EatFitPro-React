import { useContext } from "react";
import EatFitProContext from "../../../store/context";

import ButtonUI from "../../UI/Button/Button";

// import styles from "./ListingController.module.css";

const ListingController = () => {
  const context = useContext(EatFitProContext);

  const buttons = [
    {
      name: "User",
      variant: "List",
      click: context.changeListPage,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food",
      variant: "List",
      click: context.changeListPage,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food Category",
      variant: "List",
      click: context.changeListPage,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity",
      variant: "List",
      click: context.changeListPage,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Activity Category",
      variant: "List",
      click: context.changeListPage,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
    {
      name: "Food And Activity Assignment",
      variant: "List",
      click: context.changeListPage,
      style: {
        color: "#084392",
        backgroundColor: "#084392",
      },
    },
  ];

  return (
    <div>
      {buttons.map((value) => {
        return (
          <ButtonUI
            key={value.name}
            name={value.name}
            variant={value.variant}
            onClick={value.click}
            style={value.style}
          />
        );
      })}
    </div>
  );
};

export default ListingController;
