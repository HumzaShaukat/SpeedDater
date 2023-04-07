import React from "react";
//imports needed for connection mutations
import { useMutation } from "@apollo/client";
import { ACCEPT_CONNECTION, DELETE_REQUEST } from "../../utils/mutations";
//react bootstrap tags imported and used to structure/style this component
import { Button, Card } from "react-bootstrap";
//imports corresponding css styling file
import "../../styles/dashboard.css";
//imports to assist in routing
import { Link, useNavigate } from "react-router-dom";

//handles creating and rendering html and functioning connection requests
function ConnectionRequest(props) {
  //use navigate-- for routing
  const navigate = useNavigate();
  //sets state of accept request mutation
  const [acceptConnection] = useMutation(ACCEPT_CONNECTION);
  //set state of delete request mutation
  const [deleteRequest] = useMutation(DELETE_REQUEST);
  //function to handle if user chooses to deny a user's request
  const deleteReqHandler = async (userId) => {
    //calls delete request mutation
    try {
      const { data } = await deleteRequest({
        variables: { userId: userId },
      }).then(() => navigate(0));
    } catch (err) {
      console.error(err);
    }
  };
  //function to handle if user accepts a request
  const acceptConHandler = async (userId) => {
    //calls accept request mutation
    try {
      const { data } = await acceptConnection({
        variables: { userId: userId },
      }).then(() => navigate(0));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div key={props._id} className="requestCard">
      <Link id="reqFri" to={`/profile/${props._id}`}>
        {props.username}
      </Link>
      <Button
        variant="success"
        size="sm"
        className="acceptBtn"
        onClick={() => acceptConHandler(props._id)}
      >
        Accept
      </Button>
      <Button
        size="sm"
        variant="danger"
        className="rejectBtn"
        onClick={() => deleteReqHandler(props._id)}
      >
        Delete
      </Button>
    </div>
  );
}
//exports this component to be used within the user dashboard page
export default ConnectionRequest;
