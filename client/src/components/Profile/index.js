//imports hook
import React, { useState } from "react";
//imports corresponding css styling file
import "../../styles/profile.css";
//imports needed for initiating a connection request mutation
import { useMutation } from "@apollo/client";
import { ADD_CONNECTION } from "../../utils/mutations";
import { useParams } from "react-router-dom";
//imports the carousel from react bootstrap to style user's uploaded photos
import { Carousel } from "react-bootstrap";

//function to handle creating a structure/styled functioning profile component
const MyProfile = ({ myUser, myBio, myPreference }) => {
  //finds the user id of the logged in user to render their profile
  const userId = useParams().id;
  //set state of connection request 
  const [addConnection] = useMutation(ADD_CONNECTION);
  //set state to hide/show 'add connection' button on user profile
  const [hideButton, setHideButton] = useState(false);
  //function to handle a user sending a connection request
  const addConHandler = async () => {
    //calls add connection mutation to initiate connection request between users
    try {
      const { data } = await addConnection({
        variables: { userId: userId },
      });
      //hides 'add connection' button if user clicks it
      setHideButton(true);
    } catch (err) {
      console.error(err);
    }
  };
// returns structured/ styled functioning user profile component
  return (
    <div className="bigContainer">
      <h2 className="welcome">Welcome To {myUser.username}'s Profile</h2>
      <div className="addConnect">
        {!hideButton ? (
          <button className="connect-btn" onClick={addConHandler}>
            Add Connection
          </button>
        ) : null}
      </div>
      <div className="biopreferenceContainer">
        <div className="imagepreference col-lg-3 col-md-4 col-sm-12">
          <div className="imagecontainer">
            <Carousel interval={null} className="carousel">
              {myBio.pictures
                ? myBio.pictures.map((picture, index) => {
                    return (
                      <Carousel.Item className="carouselItem" key={index}>
                        <img
                          className="sliderimgDash"
                          src={picture}
                          key={picture}
                        ></img>
                      </Carousel.Item>
                    );
                  })
                : null}
            </Carousel>
          </div>
          <div className="preferences">
            <h2 className="preferenceTitle">{myUser.username}'s Preferences</h2>
            <h4>Minimum Age: {myPreference.ageMin}</h4>
            <h4>Maximum Age: {myPreference.ageMax}</h4>
            <h4>Sex Orientation: {myPreference.sexOrientation}</h4>
            <h4>Gender: {myPreference.gender}</h4>
            <h4>Location: {myPreference.location}</h4>
          </div>
        </div>
        <div className="biosection col-lg-8 col-md-7 col-sm-12">
          <h2 className="bioTitle"> {myUser.username}'s Bio</h2>
          <div className="section col-md-12 col-sm-12">
            <h3 className="col-lg-3 col-md-12 col-sm-12 sectionTitle">
              Summary:
            </h3>
            <h3 className="col-lg-9 col-md-12 col-sm-12 sectionInfo">
              {myBio.bio}
            </h3>
          </div>
          <div className="section col-md-12 col-sm-12">
            <h3 className="col-lg-3 col-md-12 col-sm-12 sectionTitle">
              Interests:
            </h3>
            <h3 className="col-lg-9 col-md-12 col-sm-12 sectionInfo">
              {myBio.interests}
            </h3>
          </div>
          <div className="section col-md-12 col-sm-12">
            <h3 className="col-lg-3 col-md-12 col-sm-12 sectionTitle">Age:</h3>
            <h3 className="col-lg-9 col-md-2 col-sm-2 sectionInfo">
              {myBio.age}
            </h3>
          </div>
          <div className="section col-md-12 col-sm-12">
            <h3 className="col-lg-3 col-md-12 col-sm-12 sectionTitle">
              Gender:
            </h3>
            <h3 className="col-lg-9 col-md-2 col-sm-2 sectionInfo">
              {myBio.gender}
            </h3>
          </div>
          <div className="section col-md-12 col-sm-12">
            <h3 className="col-lg-3 col-md-12 col-sm-12 sectionTitle">
              Location:
            </h3>
            <h3 className="col-lg-9 col-md-2 col-sm-2 sectionInfo">
              {myBio.location}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
//exports profile component
export default MyProfile;
