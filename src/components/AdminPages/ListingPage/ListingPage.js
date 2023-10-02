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
        {(context.userListVisible && <UserList />) ||
          (context.foodListVisible && <FoodList />) ||
          (context.foodCategoryListVisible && <FoodCategoryList />) ||
          (context.activityListVisible && <ActivityList />) ||
          (context.activityCategoryListVisible && <ActivityCategoryList />) ||
          (context.foodAndActivityAssignmentListVisible && (
            <FoodAndActivityAssignmentList />
          ))}
      </div>
    </div>
  );
};

export default ListingPage;
