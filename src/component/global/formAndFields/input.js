import React, { useRef, useEffect } from "react";
import styles from "./formAndFields.module.css";

const InputField = ({ full, id, type, name, autoComplete, label }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleFocus = (event) => {
      event.target.classList.add(styles.active);
    };

    const handleBlur = (event) => {
      if (event.target.value.trim() === "") {
        event.target.classList.remove(styles.active);
      }
      event.target.value = event.target.value.trim();
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);

      return () => {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  return (
    <div className={`${styles.formControl} ${full ? styles.full : ""}`}>
      <input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete ? "on" : "off"}
        className={styles.field}
        ref={inputRef}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputField;
