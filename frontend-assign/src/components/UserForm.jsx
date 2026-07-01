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


const UserForm = () => {
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
  }
 
  return (
    <section >
      <div >
        <p >Client side form</p>
        <h2>Create New User</h2>
      </div>

      <form  onSubmit={handleSubmit} noValidate>
        <div >
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

        <div >
          <button  type="submit">
            Add User
          </button>
          {success && <p >{success}</p>}
        </div>
      </form>
    </section>
  )
}

export default UserForm