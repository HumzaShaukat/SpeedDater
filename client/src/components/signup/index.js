import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/signupLogin.css";
import { useNavigate } from "react-router-dom";
import InitBioPage from "../../pages/bioForm";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import auth from "../../utils/auth";

const SignupForm = () => {
  const navigate = useNavigate();
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
    navigate("/newbio");
    return <InitBioPage />;
  };

  return (
    <div className="signup">
      <Form
        className="signupForm"
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
      >
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>
        <h2 className="text-center">New User? Sign Up!</h2>
        <Form.Group>
          <Form.Label htmlFor="username" className="formText">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            className="input"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email" className="formText">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            className="input"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password" className="formText">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            className="input"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
          className="signupSubmit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
