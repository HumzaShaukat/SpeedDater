//imports hooks
import React, { useState, useEffect } from "react";
//imports react bootstrap tags for structuring html
import { Form, Button, Alert } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/bioform.css";
//imports use navigate to assist in routing
import { useNavigate } from "react-router-dom";
//imports preference page to navigate to upon form submit
import InitPreferencePage from "../../pages/PreferenceTest";
//imports needed for mutation to create a users bio data
import { useMutation } from "@apollo/client";
import { ADD_BIO } from "../../utils/mutations";

//function to handle creating and rendering the initial functioning bio data form
const InitBioForm = () => {
  //declares usenavigate as a function
  const navigate = useNavigate();
  // set initial form state to empty strings 
  const [userFormData, setUserFormData] = useState({
    interests: "",
    bio: "",
    age: "",
    gender: "",
    location: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
//state for add bio mutation
  const [addBio, { error }] = useMutation(ADD_BIO);

//if there is an issue with the user's input, triggers alert
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  //sets name, value pair for input in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //handles the user submitting the completed form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything needed
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
//calls addbio mutation to create the logged in user's bio data
    try {
      const { data } = await addBio({
        variables: {
          interests: userFormData.interests,
          bio: userFormData.bio,
          age: parseInt(userFormData.age),
          gender: userFormData.gender,
          location: userFormData.location,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
//resets the form inputs to empty strings
    setUserFormData({
      interests: "",
      bio: "",
      age: "",
      gender: "",
      location: "",
      pictures: "",
    });
//seemlessly navigate to the next user input prompt page
    navigate("/newpref");
    return <InitPreferencePage />;
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        className="col-lg-6 col-md-6 col-sm-12 bioForm"
      >
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your Form!
        </Alert>

        <Form.Group className="bioGroup">
          <Form.Label className="bioText" htmlFor="bio">
            Your Bio
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="What do you others to know about you?"
            name="bio"
            onChange={handleInputChange}
            value={userFormData.bio}
            required
          />
          <Form.Control.Feedback type="invalid">
            Bio is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="bioGroup">
          <Form.Label htmlFor="interests" className="bioText">
            Your Interests
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your interests"
            name="interests"
            onChange={handleInputChange}
            value={userFormData.interests}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="bioGroup">
          <Form.Label htmlFor="age" className="bioText">
            Your Age
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your age"
            name="age"
            onChange={handleInputChange}
            value={userFormData.age}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="bioGroup">
          <Form.Label htmlFor="gender" className="bioText">
            Your Gender
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your gender"
            name="gender"
            onChange={handleInputChange}
            value={userFormData.gender}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="bioGroup">
          <Form.Label htmlFor="location" className="bioText">
            Your Location
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your State"
            name="location"
            onChange={handleInputChange}
            value={userFormData.location}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.interests &&
              userFormData.bio &&
              userFormData.age &&
              userFormData.gender &&
              userFormData.location
            )
          }
          type="submit"
          className="bioSubmit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default InitBioForm;
