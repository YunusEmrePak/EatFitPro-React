import { useState } from "react";
import AddingFormController from "../../Controller/FormController/AddingFormController";
import UserForm from "../../Forms/UserForm/UserForm";
import FoodForm from "../../Forms/FoodForm/FoodForm";

import styles from "./AddingPage.module.css";

const AddingPage = () => {
  const [userFormVisible, setUserFormVisible] = useState(true);
  const [foodFormVisible, setFoodFormVisible] = useState(false);

  const showUserForm = () => {
    setUserFormVisible(true);
    setFoodFormVisible(false);
  };

  const showFoodForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(true);
  };

  return (
    <div className={styles.addingPage}>
      <AddingFormController
        showUserForm={showUserForm}
        showFoodForm={showFoodForm}
        userFormVisible={userFormVisible}
        foodFormVisible={foodFormVisible}
      />
      <div className={styles.formContainer}>
        {(userFormVisible && <UserForm />) || (foodFormVisible && <FoodForm />)}
      </div>
    </div>
  );
};

export default AddingPage;
