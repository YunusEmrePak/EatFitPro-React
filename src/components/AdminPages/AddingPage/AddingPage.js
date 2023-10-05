import { useContext } from "react";
import FoodForm from "../../Forms/AddingForms/FoodForm/FoodForm";
import UserForm from "../../Forms/AddingForms/UserForm/UserForm";
import EatFitProContext from "../../../store/context";

import styles from "./AddingPage.module.css";
import FoodCategoryForm from "../../Forms/AddingForms/FoodCategoryForm/FoodCategoryForm";
import ActivityForm from "../../Forms/AddingForms/ActivityForm/ActivityForm";
import ActivityCategoryForm from "../../Forms/AddingForms/ActivityCategoryForm/ActivityCategoryForm";
import FoodAndActivityAssignmentForm from "../../Forms/AddingForms/FoodAndActivityAssignmentForm/FoodAndActivityAssignmentForm";

const AddingPage = () => {
  const context = useContext(EatFitProContext);

  return (
    <div className={styles.addingPage}>
      {(context.currentFormPage === "User" && <UserForm />) ||
        (context.currentFormPage === "Food" && <FoodForm />) ||
        (context.currentFormPage === "Food Category" && <FoodCategoryForm />) ||
        (context.currentFormPage === "Activity" && <ActivityForm />) ||
        (context.currentFormPage === "Activity Category" && <ActivityCategoryForm />) ||
        (context.currentFormPage === "Food And Activity Assignment" && (
          <FoodAndActivityAssignmentForm />
        ))}
    </div>
  );
};

export default AddingPage;
