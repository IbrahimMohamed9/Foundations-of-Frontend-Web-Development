import React, { useState } from "react";
import styles from "./formAndFields.module.css";

const Form = ({ inputs, textAreas, formId, handleSubmit }) => {
  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className={styles.inputs}>{inputs}</div>
      {textAreas}
      <input type="submit" className={styles.submit} value="Submit" />
    </form>
  );
};

export default Form;
