import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Button, Alert } from "react-bootstrap";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({ username: "", email: "", password: "" });
  };

  return (
    <>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your username"
            value={userFormData.username}
            onChange={handleInputChange}
            autoComplete="current-username"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={userFormData.email}
            onChange={handleInputChange}
            autoComplete="current-email"
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={userFormData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div>Signup failed</div>}
      </div>
    </>
  );
};

export default SignupForm;
