import { useState } from "react";
import FormController from "../FormController/FormController";
import UserForm from "../Forms/UserForm/UserForm";

import styles from "./AdminPanel.module.css";
import FoodForm from "../Forms/FoodForm/FoodForm";

const AdminPanel = () => {
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
    <div className={styles.adminPanel}>
      <FormController
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

export default AdminPanel;
