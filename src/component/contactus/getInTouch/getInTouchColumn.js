import React from "react";
import styles from "./getInTouch.module.css";
const GetInTouchColumn = ({ icon, title, content }) => {
  return (
    <div className={styles.col}>
      <div className={styles.background}>{icon}</div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default GetInTouchColumn;
