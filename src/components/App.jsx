import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
  updateFilter,
} from "../redux/contactsSlice";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { nanoid } from "nanoid";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);

  const handleAddContact = (newContact) => {
    const existingNameContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    const existingNumberContact = contacts.find(
      (contact) => contact.number === newContact.number
    );

    if (existingNameContact || existingNumberContact) {
      alert("Contact with the same name or number already exists!");
      return;
    }

    dispatch(addContact({ ...newContact, id: nanoid() }));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(updateFilter(newFilter));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
