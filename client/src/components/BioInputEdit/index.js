//imports react hooks needed
import React, { useState, useEffect } from "react";
//imports react bootstrap styling tags
import { Form, Button, Alert } from "react-bootstrap";
//imports edit bio form's corresponding css styling file from styles folder
import "../../styles/bioform.css";
//imports needed to use data mutations
import { useMutation } from "@apollo/client";
import { UPDATE_BIO } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

const EditBioForm = ({ myBio }) => {
  const navigate = useNavigate();
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    interests: myBio.interests,
    bio: myBio.bio,
    age: myBio.age,
    gender: myBio.gender,
    location: myBio.location,
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

//calls the update bio mutation 
  const [updateBio, { error }] = useMutation(UPDATE_BIO);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);
//declares user input as key value pair in order to update the data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
//function to check the form has been filled out properly, then execute the updatebio mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
//mutation called in this try, updates db with the user's new form input
    try {
      const { data } = await updateBio({
        variables: {
          interests: userFormData.interests,
          bio: userFormData.bio,
          age: parseInt(userFormData.age),
          gender: userFormData.gender,
          location: userFormData.location,
        },
      });
      navigate("/dashboard");
      return <Dashboard />;
    } catch (err) {
      console.error(err);
    }
//resets the form to empty strings after user has submitted their updated bio info
    setUserFormData({
      interests: "",
      bio: "",
      age: "",
      gender: "",
      location: "",
    });
  };
//returns the structured 'edit bio' form component with the user's existing bio data within the input fields for them to edit then submit
  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        className="col-lg-6 col-md-6 col-sm-12 bioForm"
      >
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="bioGroup">
          <Form.Label className="bioText">interests</Form.Label>

          <Form.Control
            type="text"
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
          <Form.Label className="bioText" htmlFor="bio">
            bio
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your bio here"
            name="bio"
            onChange={handleInputChange}
            value={userFormData.bio}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="bioGroup">
          <Form.Label htmlFor="age" className="bioText">
            age
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
          <Form.Label className="bioText" htmlFor="gender">
            gender
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
          <Form.Label className="bioText" htmlFor="location">
            location
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your city"
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
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditBioForm;
