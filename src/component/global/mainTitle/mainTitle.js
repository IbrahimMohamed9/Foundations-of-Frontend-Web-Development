import React, { useRef } from "react";
import styles from "./mainTitle.module.css";

const MainTitle = ({ title }) => {
  const titleRef = useRef(null);

  const dotAnimation = () => {
    const title = titleRef.current;
    title.classList.remove(styles.unhovered);
    title.classList.add(styles.hovered);
    setTimeout(() => {
      title.classList.remove(styles.hovered);
      title.classList.add(styles.unhovered);
    }, 1500);
  };

  return (
    <h2
      className={`${styles.mainTitle} ${styles.unhovered}`}
      onMouseEnter={dotAnimation}
      ref={titleRef}
    >
      {title}
    </h2>
  );
};
export default MainTitle;
