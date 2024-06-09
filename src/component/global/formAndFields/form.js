import React from "react";
import styles from "./formAndFields.module.css";

const Form = ({ inputs, textAreas, formId }) => {
  return (
    <form id={formId}>
      <div className={styles.inputs}>{inputs}</div>
      {textAreas}
      <input type="submit" className={styles.submit} value="Submit" />
    </form>
  );
};

export default Form;
