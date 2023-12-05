import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "./contactsSlice";
import ContactItem from "./ContactItem";

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={() => handleDeleteContact(contact.id)}
        />
      ))}
    </ul>
  );
};

export default ContactList;
