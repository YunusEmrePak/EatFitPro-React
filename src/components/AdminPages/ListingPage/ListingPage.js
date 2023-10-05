import { useContext } from "react";
import FoodList from "../../Lists/FoodList/FoodList";
import UserList from "../../Lists/UserList/UserList";
import EatFitProContext from "../../../store/context";

import styles from "./ListingPage.module.css";
import FoodCategoryList from "../../Lists/FoodCategoryList/FoodCategoryList";
import ActivityList from "../../Lists/ActivityList/ActivityList";
import ActivityCategoryList from "../../Lists/ActivityCategoryList/ActivityCategoryList";
import FoodAndActivityAssignmentList from "../../Lists/FoodAndActivityAssignmentList/FoodAndActivityAssignmentList";

const ListingPage = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.listingPage}>
      <div className={styles.listContainer}>
        {(context.currentListPage === "User" && <UserList />) ||
          (context.currentListPage === "Food" && <FoodList />) ||
          (context.currentListPage === "Food Category" && <FoodCategoryList />) ||
          (context.currentListPage === "Activity" && <ActivityList />) ||
          (context.currentListPage === "Activity Category" && <ActivityCategoryList />) ||
          (context.currentListPage === "Food And Activity Assignment" && (
            <FoodAndActivityAssignmentList />
          ))}
      </div>
    </div>
  );
};

export default ListingPage;
