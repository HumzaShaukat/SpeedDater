import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { UPDATE_PREFERENCE } from "../../utils/mutations";




const EditPreferenceForm = ({ myPreference }) => {

    

  // set initial form state
  const [userFormData, setUserFormData] = useState({
    
    ageMin: myPreference.ageMin,
    ageMax: myPreference.ageMax,
    sexOrientation: myPreference.sexOrientation,
    gender: myPreference.gender,
    location: myPreference.location,
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);


  const [updatePreference, { error }] = useMutation(UPDATE_PREFERENCE);

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
      const { data } = await updatePreference({
          variables: {
            ageMin: parseInt(userFormData.ageMin),
            ageMax: parseInt(userFormData.ageMax),
            sexOrientation: userFormData.sexOrientation,
            gender: userFormData.gender,
            location: userFormData.location,
          }
        
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
        ageMin: "",
        ageMax: "",
        sexOrientation: "",
        gender: "",
        location: "",
        
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>
        
        <Form.Group>
          <Form.Label htmlFor="ageMin">Min Age </Form.Label>
          
          <Form.Control
            type="text"
            name="ageMin"
            onChange={handleInputChange}
            value={userFormData.ageMin}
            required
            
          />
          <Form.Control.Feedback type="invalid">
            Minimum age preference is required!
          </Form.Control.Feedback>
          
        </Form.Group>
       
        <Form.Group>
          <Form.Label htmlFor="ageMax">Max Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Maximum preferred age"
            name="ageMax"
            onChange={handleInputChange}
            value={userFormData.ageMax}
            required
          />
          <Form.Control.Feedback type="invalid">
            Maximum age preference is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="sexOrientation">Sexual Orientation</Form.Label>
          <Form.Control
            type="text"
            name="sexOrientation"
            onChange={handleInputChange}
            value={userFormData.sexOrientation}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please include your sexual orientation.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="gender">gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your gender"
            name="gender"
            onChange={handleInputChange}
            value={userFormData.gender}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your preferred gender.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="location">location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your city"
            name="location"
            onChange={handleInputChange}
            value={userFormData.location}
            required
          />
          <Form.Control.Feedback type="invalid">
             Please enter your preferred match's location.
          </Form.Control.Feedback>
        </Form.Group>



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
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditPreferenceForm;