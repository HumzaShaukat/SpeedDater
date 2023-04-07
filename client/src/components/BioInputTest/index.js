import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/bioform.css";
import { useNavigate } from "react-router-dom";
import InitPreferencePage from "../../pages/PreferenceTest";
import { useMutation } from "@apollo/client";
import { ADD_BIO } from "../../utils/mutations";

const InitBioForm = () => {
  const navigate = useNavigate();
  // set initial form state
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

  const [addBio, { error }] = useMutation(ADD_BIO);

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

    setUserFormData({
      interests: "",
      bio: "",
      age: "",
      gender: "",
      location: "",
      pictures: "",
    });

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
