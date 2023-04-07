//imports hooks
import React, { useState, useEffect } from "react";
//imports react bootstrap tags for structuring/styling login/signup component
import { Form, Button, Alert } from "react-bootstrap";
//imports use navigate to assist with routing
import { useNavigate } from "react-router-dom";
//imports needed for login mutation
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
//imports corresponding css styling file
import "../../styles/signupLogin.css";
//imports auth helper
import Auth from "../../utils/auth";

//function to handle creating/structuring/styling functioning login/signup component to page
const LoginForm = () => {
  //sets usenavigate as function
  const navigate = useNavigate();
  //set state of the form 
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  //state of form validation
  const [validated] = useState(false);
  //state of validation alert
  const [showAlert, setShowAlert] = useState(false);
  //state of login mutation
  const [login, { error }] = useMutation(LOGIN_USER);

  //triggers alert if there is an issue with form input
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  //assigns key value pairs to form inputs for user data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
//function to handle when user submits form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
//checks form validity
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
//calls login mutation 
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      //checks auth user valid token
      Auth.login(data.login.token);
      //redirects to user's dashboard on successful login
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
    }

   //sets login form input back to empty strings
    setUserFormData({
      email: "",
      password: "",
    });
  };
//renders structures/ styled functioning user login component
  return (
    <div className="login">
      <Form
        noValidate
        validated={validated}
        className="loginForm"
        onSubmit={handleFormSubmit}
      >
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <h2 className="text-center">Login!</h2>
        <Form.Group>
          <Form.Label className="formText" htmlFor="email">
            Email
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
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
            className="input"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          className="loginSubmit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
//exports user login form component to be imported on corresponding login page file
export default LoginForm;
