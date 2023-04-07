import React from "react";
//imports react bootstrap tags to use in structuring component
import { Container, Card, Row } from "react-bootstrap";
//imports corresponding css styling file 
import "../../styles/profileList.css";
//imports link to assist in routing 
import { Link } from "react-router-dom";

//function to handle creating and rendering all profiles component
const AllProfiles = (props) => {
  //declares bios as a const, sets it to a prop to pull and pass in user bio data
  const { bios } = props;
  console.log(bios);
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
