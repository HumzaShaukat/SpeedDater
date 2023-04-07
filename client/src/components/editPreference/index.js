//imports hooks
import React, { useState, useEffect } from "react";
//imports react bootstrap tags for structuring/styling this component
import { Form, Button, Alert } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/bioform.css";
//imports usenavigate to assist in routing
import { useNavigate } from "react-router-dom";
//imports the user dashboard component
import Dashboard from "../../pages/Dashboard";
//imports needed for update preference mutation
import { useMutation } from "@apollo/client";
import { UPDATE_PREFERENCE } from "../../utils/mutations";

//function to handles creating/rendering a functioning form for user to update their existing preference data
const EditPreferenceForm = ({ myPreference }) => {
  //sets navigate to function to assist in routing 
  const navigate = useNavigate();
  // set initial form state to the user's existing preference data to be editted
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
//set state for update preference mutation
  const [updatePreference, { error }] = useMutation(UPDATE_PREFERENCE);
//triggers state of form validation 
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);
//sets key value pair of userform to corresponding db values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
//function to handle when user submites form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //calls update preference mutation; existing preference data will be updated to the new user inputs
      const { data } = await updatePreference({
        variables: {
          ageMin: parseInt(userFormData.ageMin),
          ageMax: parseInt(userFormData.ageMax),
          sexOrientation: userFormData.sexOrientation,
          gender: userFormData.gender,
          location: userFormData.location,
        },
      });
    } catch (err) {
      console.error(err);
    }
    //form submit directs user to their dashboard page
    navigate("/dashboard");
    return <Dashboard />;
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
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="bioGroup">
          <Form.Label className="bioText" htmlFor="ageMin">
            Min Age{" "}
          </Form.Label>

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

        <Form.Group className="bioGroup">
          <Form.Label className="bioText" htmlFor="ageMax">
            Max Age
          </Form.Label>
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

        <Form.Group className="bioGroup">
          <Form.Label className="bitText" htmlFor="sexOrientation">
            Sexual Orientation
          </Form.Label>
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
            Please enter your preferred gender.
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
//exports edit preference form component; imported to corresponding file in page folder
export default EditPreferenceForm;
