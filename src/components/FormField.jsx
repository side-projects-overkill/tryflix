import React from "react";
import { Field, ErrorMessage } from "formik";

const FormField = ({
  label,
  name,
  type = "text",
  numeric = false,
  allowSlash = false,
}) => {
  const handleInput = (e) => {
    if (numeric) {
      if (allowSlash) {
        e.target.value = e.target.value.replace(/[^0-9/]/g, "");
      } else {
        e.target.value = e.target.value.replace(/\D/g, "");
      }
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        id={name}
        className="input"
        inputMode={numeric ? "numeric" : undefined}
        pattern={numeric ? (allowSlash ? "[0-9/]*" : "[0-9]*") : undefined}
        onInput={handleInput}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormField;
