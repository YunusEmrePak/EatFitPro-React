import { useContext } from "react";
import FoodList from "../../Lists/FoodList/FoodList";
import UserList from "../../Lists/UserList/UserList";
import EatFitProContext from "../../store/context";

import styles from "./ListingPage.module.css";
import FoodCategoryList from "../../Lists/FoodCategoryList/FoodCategoryList";

const ListingPage = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.listingPage}>
      <div className={styles.listContainer}>
        {(context.userListVisible && <UserList />) ||
          (context.foodListVisible && <FoodList />) ||
          (context.foodCategoryListVisible && <FoodCategoryList />)}
      </div>
    </div>
  );
};

export default ListingPage;
