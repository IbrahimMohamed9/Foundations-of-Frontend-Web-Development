import React, { useRef, useEffect } from "react";
import styles from "./formAndFields.module.css";

const TexAreaField = ({ id, name, label }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    const handleFocus = (event) => {
      event.target.classList.add(styles.active);
      event.target.parentNode.nextSibling.classList.add(styles.active);
    };

    const handleBlur = (event) => {
      const textarea = event.target;
      const textareaLabel = event.target.parentNode.nextSibling;

      if (textarea.value.trim() === "") {
        textarea.classList.remove(styles.active);
        textareaLabel.classList.remove(styles.active);
      }
      textarea.value = textarea.value.trim();
    };

    const textAreaElement = textAreaRef.current;
    if (textAreaElement) {
      textAreaElement.addEventListener("focus", handleFocus);
      textAreaElement.addEventListener("blur", handleBlur);

      return () => {
        textAreaElement.removeEventListener("focus", handleFocus);
        textAreaElement.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  return (
    <div className={styles.formControl}>
      <div className={styles.textarea}>
        <textarea
          id={id}
          name={name}
          className={styles.field}
          ref={textAreaRef}
        ></textarea>
      </div>
      <label htmlFor={id} className={styles.txtarLabel}>
        {label}
      </label>
    </div>
  );
};

export default TexAreaField;
