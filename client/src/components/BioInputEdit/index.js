//imports hooks
import React, { useState, useEffect } from "react";
//imports react bootstrap tags for structing/styling the component
import { Form, Button, Alert } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/bioform.css";
//imports use of mutation
import { useMutation } from "@apollo/client";
import { UPDATE_BIO } from "../../utils/mutations";
//imports use navigate to assist in routing
import { useNavigate } from "react-router-dom";
//imports dashboard page to be navigated to upon form submit
import Dashboard from "../../pages/Dashboard";

//function to handle creating and rendering a functioning edit form for existing user data
const EditBioForm = ({ myBio }) => {
  //sets usenavigate to a const
  const navigate = useNavigate();
  // set initial form state to the user's existing bio data
  //this is pulled from the db
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
//set state for update bio mutation
  const [updateBio, { error }] = useMutation(UPDATE_BIO);

  //triggered if user input is not entered properly or missing
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  //sets key value pairs of form input to bio data model
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
//handles when the form is submitted by user
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
//calls updatebio mutation and applies it to update bio data in db based off of the user's new inputs
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
      //seemlessly renders the user dashboard page on submit of form
      navigate("/dashboard");
      return <Dashboard />;
    } catch (err) {
      console.error(err);
    }
//sets inputs on form to empty strings
    setUserFormData({
      interests: "",
      bio: "",
      age: "",
      gender: "",
      location: "",
    });
  };

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
//exports component. this will be imported to its corresponding file in the page folder.
export default EditBioForm;
