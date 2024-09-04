import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Form, Button, Alert } from "react-bootstrap";

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container className="my-4">
      <Form noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Login failed! Check your credentials and try again.
          </Alert>
        )}

        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={formState.email}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formState.password}
            required
          />
        </Form.Group>

        <Button
          disabled={!formState.email || !formState.password}
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
