//this file creates the content for the page displaying the list of all user account
import React from "react";
//imports react bootstrap tags for styling
import { Container, Card, Row } from "react-bootstrap";
//imports css file for styling
import "../../styles/profileList.css";
//imports link to be use to navigate between pages
import { Link } from "react-router-dom";

//this function passes user data from the db into the structuring of the page to display to dom
const AllProfiles = (props) => {
  //declares 'bios' as a const and allows use of bio data as a prop
  const { bios } = props;
  console.log(bios);
  //returns the structured/ styled/ component with db data called to the page
  //this component is exported, then imported into its corresponding page file
  return (
    <Container className="profileList">
      {bios.map((user) => {
        return (
          <Card id="userCard">
            <Card.Header id="cardHead" key={user.userId._id}>
              <Link to={`/profile/${user.userId._id}`}>
                <h4>{user.userId.username}</h4>
              </Link>
            </Card.Header>
            <Row id="plistinfo">
              <div>
                {user.pictures ? (
                  <img className="plistPic" src={user.pictures[0]} />
                ) : null}
              </div>
              <div id="writtenInfo">
                <p>{user.bio}</p>
                <h6>
                  {user.age} || {user.gender} || {user.location}
                </h6>
              </div>
            </Row>
          </Card>
        );
      })}
    </Container>
  );
};

export default AllProfiles;
