import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../redux/contactsSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const contacts = useSelector((state) => state.contacts.contacts);

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    const existingNameContact = contacts.find(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    const existingNumberContact = contacts.find(
      (contact) => contact.number === values.number
    );

    if (existingNameContact || existingNumberContact) {
      setError("Contact with the same name or number already exists!");
      return;
    }

    try {
      setError(null);
      await dispatch(addContact({ ...values }));
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .matches(
        /^[A-Za-zА-Яа-я\s]+$/,
        "Invalid name format. Only letters and spaces are allowed."
      )
      .required("Name is required"),
    number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" style={{ color: "red" }} />

        <Field type="tel" name="number" placeholder="Number" />
        <ErrorMessage name="number" component="div" style={{ color: "red" }} />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
