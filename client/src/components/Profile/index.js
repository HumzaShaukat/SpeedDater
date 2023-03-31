import React, { useState } from "react";
import image from "../../image/woman.png";
import "../../styles/profile.css";
import { useMutation } from "@apollo/client";
import { ADD_CONNECTION } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MyProfile = ({ myUser, myBio, myPreference }) => {
  // if (!myUser.length) {
  //   return <h2>Create Your Profile</h2>;
  // }
  const userId = useParams().id;
  const [addConnection] = useMutation(ADD_CONNECTION);
  const [hideButton, setHideButton] = useState(false);
  const addConHandler = async () => {
    try {
      const { data } = await addConnection({
        variables: { userId: userId },
      });
      setHideButton(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bigContainer">
      <h2 className="welcome">Welcome To {myUser.username}'s Profile</h2>
      <div className="biopreferenceContainer">
        <div className="imagepreference col-lg-3 col-md-4 col-sm-12">
          <div className="imagecontainer">
            <AliceCarousel>
              {myBio.pictures
                ? myBio.pictures.map((picture) => {
                    return (
                      <img
                        className="profilePicture col-lg-12 col-md-12 col-sm-12 sliderimg"
                        src={picture}
                        key={picture}
                      ></img>
                    );
                  })
                : null}
            </AliceCarousel>
          </div>
          <div className="preferences">
            <h2 className="preferenceTitle">Their Preferences</h2>
            <h4>Minimum Age: {myPreference.ageMin}</h4>
            <h4>Maximum Age: {myPreference.ageMax}</h4>
            <h4>Sex Orientation: {myPreference.sexOrientation}</h4>
            <h4>Gender: {myPreference.gender}</h4>
            <h4>Location: {myPreference.location}</h4>
          </div>
        </div>
        <div className="biosection col-lg-8 col-md-8 col-sm-12">
          <h2 className="bioTitle"> Their Bio</h2>
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
        {!hideButton ? (
          <button className="connect-btn" onClick={addConHandler}>
            Add Connection
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MyProfile;
