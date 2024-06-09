import React, { useState } from "react";
import styles from "./formSection.module.css";
import InputField from "../../global/formAndFields/input";
import MainTitle from "./../../global/mainTitle/mainTitle";
import Form from "../../global/formAndFields/form";
import TexAreaField from "../../global/formAndFields/textArea";

const FormSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\+?\d{6,18}$/;

    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? "" : "Name is required";
    tempErrors.email = emailRegex.test(formData.email)
      ? ""
      : "Email is not valid";

    tempErrors.phone = phoneRegex.test(formData.phone)
      ? ""
      : "Phone number is not valid";

    tempErrors.message = formData.message ? "" : "Message is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.container}>
        <MainTitle
          title={
            <>
              Let's Talk About
              <br />
              Your Trip
            </>
          }
        />
        <p className={styles.prag}>
          Drop us a line through the form below and we'll get back to you
        </p>
        <div className={styles.form}>
          <Form
            handleSubmit={handleSubmit}
            inputs={
              <>
                <InputField
                  full={true}
                  type="text"
                  name="fullName"
                  autoComplete={true}
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                />
                <InputField
                  full={true}
                  id="phone"
                  type="tel"
                  name="phone"
                  autoComplete={true}
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
                <InputField
                  full={true}
                  id="email"
                  type="text"
                  name="email"
                  autoComplete={true}
                  label="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </>
            }
            textAreas={
              <>
                <TexAreaField
                  name="message"
                  label="Message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection;
