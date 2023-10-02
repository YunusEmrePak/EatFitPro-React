import wheel from "../../../Assets/Images/waterWheel.png";
import yogaPerson from "../../../Assets/Images/Exercise-Yoga-drawing.png";
import runner from "../../../Assets/Images/runner.png";

import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.leftPart}>
        <img src={runner} alt="Runner" className={styles.runner} />
      </div>
      <div className={styles.mainInfo}>
        <p className={styles.title}>WELCOME TO EATFITPRO ADMIN</p>
        <p className={styles.titleInfo}>
          EFP ADMIN is currently heavily in development.
        </p>
        <div className={styles.wheelDiv}>
          <img src={wheel} alt="Wheel" className={styles.topRight} />
          <img src={wheel} alt="Wheel" className={styles.topLeft} />
          <img src={wheel} alt="Wheel" className={styles.bottomRight} />
        </div>
      </div>
      <div className={styles.rigthPart}>
        <img src={yogaPerson} alt="Yoga" className={styles.yoga} />
      </div>
    </div>
  );
};

export default MainPage;
