import React from "react";
import styles from "./formSection.module.css";
import InputField from "../../global/formAndFields/input";
import MainTitle from "./../../global/mainTitle/mainTitle";
import Form from "../../global/formAndFields/form";
import TexAreaField from "../../global/formAndFields/textArea";

const FormSection = () => {
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
            inputs={
              <>
                <InputField
                  full={true}
                  type="text"
                  name="name"
                  autoComplete={true}
                  label="Full Name"
                />
                <InputField
                  full={true}
                  id="phone"
                  type="tel"
                  name="phone"
                  autoComplete={true}
                  label="Phone"
                />
                <InputField
                  full={true}
                  id="email"
                  type="email"
                  name="email"
                  autoComplete={true}
                  label="email"
                />
              </>
            }
            textAreas={
              <>
                <TexAreaField name="message" label="Message" id="message" />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection;
