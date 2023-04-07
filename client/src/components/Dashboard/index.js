import React, { useState } from "react";
//imports react bootstrap tags for styling/ structuring component
import { Container, Carousel, Button, Row, Col, Card } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/dashboard.css";
//imports needed for mutation that handles connection request
import { DELETE_CONNECTION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import ConnectionRequest from "../connectionRequest";
//imports component for uploading pictures
import UploadFile from "../inputTest";
//imports to assist with routing
import { Link, useNavigate } from "react-router-dom";

//function to create/ render the user dashboard page; user, bio, and preference data are passed in as props
const DashboardComponent = ({ myUser, myBio, myPreference }) => {
  //navigate assists with routing between pages
  const navigate = useNavigate();
  //set state of user connection mutations
  const [deleteConnection] = useMutation(DELETE_CONNECTION);
  //set state of user picture upload 
  const [upload, setUpload] = useState(false);
  //function to handle a user denying a connection request
  const deleteConHandler = async (userId) => {
    //deletes the request
    try {
      const { data } = deleteConnection({ variables: { userId: userId } }).then(
        () => navigate(0)
      );
    } catch (err) {
      console.error(err);
    }
  };
//function to handle user uploading a new picture
  const handleUpload = () => {
    setUpload(true);
  };

  if (!myBio || !myPreference) {
    return <h1>Please add a bio and preferences</h1>;
  }
// returns the html, structured, styled, functionging dashboard component
  return (
    <Container id="container">
      <Row>
        <Col md={3} id="first">
          <Card id="card1">
            <Card.Header as="h5" id="head1">
              {myUser.username}
            </Card.Header>

            {myBio.pictures && (
              <div id="usersPicture">
                <img
                  id="propic"
                  className="profilePicture col-lg-12 col-md-12 col-sm-12"
                  src={myBio.pictures[0]}
                  alt={`${myUser.username}'s profile picture`}
                ></img>
              </div>
            )}
            <p id="dashGender" className="dashDetails">
              {myBio.gender}, <span id="dashAge">{myBio.age}</span>
            </p>
            <p id="dashOrientation" className="dashDetails">
              {myPreference.sexOrientation}
            </p>
            <p id="dashLocation" className="dashDetails">
              {myBio.location}
            </p>

            <h4>My Preferences</h4>
            <ul>
              <li>Minimum Age:{myPreference.ageMin}</li>
              <li>Maximum Age:{myPreference.ageMax}</li>
              <li>Interested In:{myPreference.gender}</li>
              <li>Preferred Location: {myPreference.location}</li>
            </ul>
          </Card>
        </Col>
        <Col lg={5} id="second">
          <Card id="card2">
            <Card.Header as="h5" id="head2">
              My Bio
            </Card.Header>

            <div id="dashbioContent">
              <p id="dashBioSummary">{myBio.bio}</p>
              <h4>Interests:</h4>
              <p id="dashInterests">{myBio.interests}</p>
            </div>
            <div className="imgSlider">
              {myBio.pictures.length && !upload ? (
                <Carousel interval={null} wrap>
                  {myBio.pictures
                    ? myBio.pictures.map((picture, index) => {
                        return (
                          <Carousel.Item key={index}>
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
              ) : null}
            </div>
            <div>
              {!upload ? (
                <Button
                  className="btn"
                  size="sm"
                  id="imgBtn"
                  onClick={handleUpload}
                >
                  Add Pictures
                </Button>
              ) : (
                <UploadFile className="dashPic" />
              )}
            </div>
          </Card>
        </Col>
        <Col id="third">
          <Card id="card3">
            <Card.Header as="h5" id="connectTitle">
              Connections
            </Card.Header>
            {/* <section id="connectionList"> */}
            <h3>Connection Requests</h3>
            <section id="connectionRequest">
              {myUser.connectRequest &&
                myUser.connectRequest.map((user) => {
                  return (
                    <ConnectionRequest
                      _id={user._id}
                      username={user.username}
                    />
                  );
                })}
            </section>
            <h3> Your Connections</h3>
            <div id="mydashfriends">
              {myUser.connections &&
                myUser.connections.map((connection) => {
                  return (
                    <div key={connection._id} className="eachfriend">
                      <Link to={`/profile/${connection._id}`}>
                        {connection.username}
                      </Link>

                      <Button
                        variant="secondary"
                        size="sm"
                        active
                        id="removeBtn"
                        value={connection._id}
                        onClick={() => deleteConHandler(connection._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
            </div>
            {/* </div> */}
            {/* </section> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
//exports the dashboard component; its imported in the corresponding file in the pages folder
export default DashboardComponent;
