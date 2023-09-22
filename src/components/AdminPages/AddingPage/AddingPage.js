import { useContext } from "react";
import FoodForm from "../../Forms/FoodForm/FoodForm";
import UserForm from "../../Forms/UserForm/UserForm";
import EatFitProContext from "../../store/context";

import styles from "./AddingPage.module.css";

const AddingPage = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.addingPage}>
      <div className={styles.formContainer}>
        {(context.userFormVisible && <UserForm />) ||
          (context.foodFormVisible && <FoodForm />)}
      </div>
    </div>
  );
};

export default AddingPage;
