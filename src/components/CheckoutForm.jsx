import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import "./CheckoutForm.scss";

const CheckoutForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expiry: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
      .required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
      .required("CVV is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values);
    alert("Payment Successful!");
    resetForm();
  };

  const fields = [
  { label: "Name", name: "name" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", numeric: true },
  { label: "Card Number", name: "cardNumber", numeric: true },
  { label: "Expiry (MM/YY)", name: "expiry", numeric: true, allowSlash: true },
  { label: "CVV", name: "cvv", numeric: true },
];

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="checkout-form">
            {fields.map((field) => (
  <FormField key={field.name} {...field} />
))}

            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
                disabled={!(isValid && dirty)}
              >
                Pay Now
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
