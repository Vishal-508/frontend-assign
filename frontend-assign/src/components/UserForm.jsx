import React, { useState } from 'react'
import { useUsers } from '../hooks/useUsers';

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  latitude: "",
  longitude: ""
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email";
  }
  if (!values.phone.trim()) errors.phone = "Phone is required";
  if (!values.company.trim()) errors.company = "Company is required";

  return errors;
}


const UserForm = ({ onCreated, onCancel }) => {
   const { addUser } = useUsers();
   const [form, setForm] = useState(initialForm);
   const [errors, setErrors] = useState({});
   const [success, setSuccess] = useState("");
 
   function handleChange(event) {
     const { name, value } = event.target;
     setForm((current) => ({ ...current, [name]: value }));
     setErrors((current) => ({ ...current, [name]: "" }));
     setSuccess("");
   }
 
   function handleSubmit(event) {
     event.preventDefault();
     const validationErrors = validate(form);
 
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }
 
     addUser(form);
     setForm(initialForm);
     setErrors({});
     setSuccess("User added successfully.");
     onCreated?.();
   }
 
  return (
  <form className="user-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          Name *
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <small>{errors.name}</small>}
        </label>

        <label>
          Email *
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}
        </label>

        <label>
          Phone *
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <small>{errors.phone}</small>}
        </label>

        <label>
          Company *
          <input name="company" value={form.company} onChange={handleChange} />
          {errors.company && <small>{errors.company}</small>}
        </label>

        <label>
          Website
          <input name="website" value={form.website} onChange={handleChange} />
        </label>

        <label>
          City
          <input name="city" value={form.city} onChange={handleChange} />
        </label>

        <label>
          Street
          <input name="street" value={form.street} onChange={handleChange} />
        </label>

        <label>
          Suite
          <input name="suite" value={form.suite} onChange={handleChange} />
        </label>

        <label>
          Zipcode
          <input name="zipcode" value={form.zipcode} onChange={handleChange} />
        </label>

        <label>
          Latitude
          <input name="latitude" value={form.latitude} onChange={handleChange} />
        </label>

        <label>
          Longitude
          <input
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="button" type="submit">
          Add User
        </button>
        <button className="button button-ghost" type="button" onClick={onCancel}>
          Cancel
        </button>
        {success && <p className="success-message">{success}</p>}
      </div>
    </form>
  );
}

export default UserForm