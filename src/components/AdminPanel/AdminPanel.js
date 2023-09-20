import FormController from "../FormController/FormController";
import UserForm from "../Forms/UserForm/UserForm";

import styles from "./AdminPanel.module.css";


const AdminPanel = () => {
    return <div className={styles.adminPanel}>
      <FormController />
      <UserForm />
    </div>;
  };
  
  export default AdminPanel;
  