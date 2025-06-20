import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import "./CheckoutForm.scss";

const cardImages = [
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
];

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
    <div className="checkout-outer">
      <div className="checkout-container">
        <div className="checkout-form-section">
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
        <div className="checkout-summary-section">
          <div className="checkout-summary">
            <span style={{fontSize: '2.2rem', display: 'block', marginBottom: 18}}>🎬</span>
            <h2 className="checkout-title">Checkout</h2>
            <p style={{color: '#bbb', fontSize: '1.08rem', margin: 0}}>
              Complete your purchase to enjoy unlimited streaming of your selected movies on <span style={{color: '#1ed760', fontWeight: 600}}>Tryflix</span>.<br/>
              Enter your details below to proceed with secure payment.
            </p>
            <div className="checkout-card-logos">
              {cardImages.map((src, idx) => (
                <img key={idx} src={src} alt="Card Logo" />
              ))}
            </div>
            <div style={{height: 1, background: 'rgba(200,200,200,0.10)', margin: '18px 0 0 0', width: '100%'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
