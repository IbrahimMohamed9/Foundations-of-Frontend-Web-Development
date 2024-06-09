import React from "react";
import styles from "./style.module.css";
const HomeVideo = () => {
  return (
    <div className={styles.videoWrapper}>
      <div className={styles.video}>
        <video autoPlay loop muted playsInline>
          Your browser does not support the video tag.
          <source
            src="https://balqan.net/assets/videos/introduction-video-en.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default HomeVideo;
