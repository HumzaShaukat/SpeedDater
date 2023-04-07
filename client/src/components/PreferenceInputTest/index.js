//imports hooks
import React, { useState, useEffect } from "react";
//imports react bootstrap tags for structuring/styling the component
import { Form, Button, Alert } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/preferenceForm.css";
//imports upload photo component
import UploadFile from "../inputTest";
//imports use navigation to assist with routing
import { useNavigate } from "react-router-dom";
//imports needed for mutation to create initial user preference data
import { useMutation } from "@apollo/client";
import { ADD_PREFERENCE } from "../../utils/mutations";
//imports dashboard page to be navigated to
import Dashboard from "../../pages/Dashboard";
// import Auth from "../../utils/auth";

//function to create structured/styled functioning preference input form component
const InitPreferenceForm = () => {
  //declares usenavigate as function to assist with routing between pages
  const navigate = useNavigate();
  // set initial form state to empty strings
  const [userFormData, setUserFormData] = useState({
    ageMin: "",
    ageMax: "",
    sexOrientation: "",
    gender: "",
    location: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
//set state of add preference mutation
  const [addPreference, { error }] = useMutation(ADD_PREFERENCE);
//shows an alert if there is an error with the users form input
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);
//sets key value pairs of input fields to preference data 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  //function to handle the form being submitted
  const handlePreferenceForm = async (event) => {
    event.preventDefault();

    // check if form has everything 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
//calls add preference mutation to create preference data for the logged in user based off of their form input
    try {
      const { data } = await addPreference({
        variables: {
          ageMin: parseInt(userFormData.ageMin),
          ageMax: parseInt(userFormData.ageMax),
          sexOrientation: userFormData.sexOrientation,
          gender: userFormData.gender,
          location: userFormData.location,
        },
      });
      console.log(data);
    
    } catch (err) {
      console.error(err);
    }
//sets form back to inputs having empty string values after submit
    setUserFormData({
      ageMin: "",
      ageMax: "",
      sexOrientation: "",
      gender: "",
      location: "",
    });
    //brings user to their dashboard page after form submit
    navigate("/dashboard");
    return <Dashboard />;
  };

  return (
    <>
      <Form
        className="col-lg-6 col-md-6 col-sm-12 preferenceForm"
        noValidate
        validated={validated}
        onSubmit={handlePreferenceForm}
      >
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="preferenceGroup ">
          <Form.Label className="preferenceText" htmlFor="ageMin">
            Minimum Age
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="preferred minimum age"
            name="ageMin"
            onChange={handleInputChange}
            value={userFormData.ageMin}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="preferenceGroup ">
          <Form.Label htmlFor="ageMax" className="preferenceText">
            Maximum age
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="preferred maximum age"
            name="ageMax"
            onChange={handleInputChange}
            value={userFormData.ageMax}
            required
          />
          <Form.Control.Feedback type="invalid">
            max age is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="preferenceGroup ">
          <Form.Label htmlFor="sexOrientation" className="preferenceText">
            Sexual Orientation
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your sexual orientation"
            name="sexOrientation"
            onChange={handleInputChange}
            value={userFormData.sexOrientation}
            required
          />
          <Form.Control.Feedback type="invalid">
            this is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="preferenceGroup ">
          <Form.Label htmlFor="gender" className="preferenceText">
            {" "}
            Preferred Gender
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your preferred gender"
            name="gender"
            onChange={handleInputChange}
            value={userFormData.gender}
            required
          />
          <Form.Control.Feedback type="invalid">
            this is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="preferenceGroup ">
          <Form.Label htmlFor="location" className="preferenceText">
            Location
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Preferred State"
            name="location"
            onChange={handleInputChange}
            value={userFormData.location}
            required
          />
          <Form.Control.Feedback type="invalid">
            this is required!
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-center uploadContainer">
          <h3 className="upload">Upload Your Profile Photo</h3>
          <UploadFile />
        </div>

        <Button
          disabled={
            !(
              userFormData.ageMin &&
              userFormData.ageMax &&
              userFormData.sexOrientation &&
              userFormData.gender &&
              userFormData.location
            )
          }
          type="submit"
          variant="success"
          className="preferenceSubmit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
//exports preference form component; imported in corresponding file in pages folder
export default InitPreferenceForm;
