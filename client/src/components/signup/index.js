//imports hookds
import React, { useState, useEffect } from "react";
//imports react bootstrap tags for structuring/ styling this component
import { Form, Button, Alert } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/signupLogin.css";
//imports usenavigate to assist in routing between pages
import { useNavigate } from "react-router-dom";
import InitBioPage from "../../pages/bioForm";
//imports needed for add user mutation
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
//imports auth helper
import auth from "../../utils/auth";

//function to create structured/styled functioning signup form component
const SignupForm = () => {
  //usenavigate declared as const; assists with routing between pages
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
//set state of add user mutation
  const [addUser, { error }] = useMutation(ADD_USER);
//triggers alert if there is an error with the users form input
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);
//sets key value pairs of user input form to user data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
//function to handle user submitting the signup form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
//calls add user mutation to create a new user
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
    //navigates the newly signed up user to the create bio form page
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
//exports signupform component; imported to the login page 
export default SignupForm;
