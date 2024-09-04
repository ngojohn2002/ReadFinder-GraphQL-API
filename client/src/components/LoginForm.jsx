import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Button, Alert } from "react-bootstrap";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({ email: "", password: "" });
  };

  return (
    <>
      <div>
        <h2>Log In</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={userFormData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={userFormData.password}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div>Login failed</div>}
      </div>
    </>
  );
};

export default LoginForm;
