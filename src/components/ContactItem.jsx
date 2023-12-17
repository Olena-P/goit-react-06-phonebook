import React, { useState } from "react";

const ContactItem = ({ contact, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id);
    }
    setIsDeleting(false);
  };

  return (
    <li>
      {contact.name}: {contact.number}
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
};

export default ContactItem;
