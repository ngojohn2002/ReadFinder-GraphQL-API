import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Form, Button, Alert } from "react-bootstrap";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setFormState({
      username: "",
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
            Signup failed! Check your information and try again.
          </Alert>
        )}

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={handleChange}
            value={formState.username}
            required
          />
        </Form.Group>

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
          disabled={
            !formState.username || !formState.email || !formState.password
          }
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
