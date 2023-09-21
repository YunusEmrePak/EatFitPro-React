import { useState } from "react";
import ListingController from "../../Controller/ListController/ListingController";
import UserList from "../../Lists/UserList/UserList";
import FoodList from "../../Lists/FoodList/FoodList";

import styles from "./ListingPage.module.css";

const ListingPage = () => {
  const [userListVisible, setUserListVisible] = useState(true);
  const [foodListVisible, setFoodListVisible] = useState(false);

  const showUserList = () => {
    setUserListVisible(true);
    setFoodListVisible(false);
  };

  const showFoodList = () => {
    setUserListVisible(false);
    setFoodListVisible(true);
  };

  return (
    <div className={styles.listingPage}>
      <ListingController
        showUserList={showUserList}
        showFoodList={showFoodList}
        userListVisible={userListVisible}
        foodListVisible={foodListVisible}
      />
      <div className={styles.listContainer}>
        {(userListVisible && <UserList />) || (foodListVisible && <FoodList />)}
      </div>
    </div>
  );
};

export default ListingPage;
