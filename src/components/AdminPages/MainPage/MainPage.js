import wheel from "../../Images/waterWheel.png";

import styles from "./MainImage.module.css";

const MainPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.mainInfo}>
        <p className={styles.title}>WELCOME TO EATFITPRO, ADMIN!</p>
        <p className={styles.titleInfo}>EFP ADMIN is currently heavily in development.</p>
        <div className={styles.wheelDiv}>
          <img src={wheel} alt="Wheel" className={styles.topRight} />
          <img src={wheel} alt="Wheel" className={styles.topLeft} />
          <img src={wheel} alt="Wheel" className={styles.bottomRight} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
