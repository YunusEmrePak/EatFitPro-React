import { useContext } from "react";
import FoodForm from "../../Forms/FoodForm/FoodForm";
import UserForm from "../../Forms/UserForm/UserForm";
import EatFitProContext from "../../store/context";

import styles from "./AddingPage.module.css";
import FoodCategoryForm from "../../Forms/FoodCategoryForm/FoodCategoryForm";

const AddingPage = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.addingPage}>
        {(context.userFormVisible && <UserForm />) ||
          (context.foodFormVisible && <FoodForm />) || 
          (context.foodCategoryFormVisible && <FoodCategoryForm />)}
    </div>
  );
};

export default AddingPage;
