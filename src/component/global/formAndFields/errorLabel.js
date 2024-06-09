import React from "react";

const ErrorLabel = ({ id, message, style }) => {
  return (
    <label htmlFor={id} className={style}>
      {message}
    </label>
  );
};

export default ErrorLabel;
