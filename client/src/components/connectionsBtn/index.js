import React from "react";
//imports needed for connections mutations
import { useMutation } from "@apollo/client";
import {
  ADD_CONNECTION,
  ACCEPT_CONNECTION,
  DELETE_REQUEST,
  DELETE_CONNECTION,
} from "../../utils/mutations";

//function to handle user interacting with requests
const ConnectionButtons = async ({ userId }) => {
  //sets states for mutations to handle outcomes of user request add/deny
  const { addConnection, error: addError } = useMutation(ADD_CONNECTION);
  const { acceptConnection, error: acceptError } =
    useMutation(ACCEPT_CONNECTION);
    //set state to handle a resolved request being deleted from db
  const { deleteRequest, error: delReqError } = useMutation(DELETE_REQUEST);
  const [deleteConnection] = useMutation(DELETE_CONNECTION);
//adds connection to first user
  const addConHandler = async () => {
    await addConnection(userId);
  };
  //adds connection to second user
  const accConHandler = async () => {
    await acceptConnection(userId);
  };
  //deletes connection request once it has been resolved between users
  const delReqHandler = async () => {
    await deleteRequest(userId);
  };

  const deleteConHandler = async () => {
    try {
      const { data } = deleteConnection({ variables: { userId: userId } });
    } catch (err) {
      console.error(err);
    }
  };
//assigns mutations to buttons of user choices in handling requests
  return (
    <div className="buttons">
      <button onclick={addConHandler}>Add Connection</button>
      <button onclick={accConHandler}>Accept Request</button>
      <button onclick={delReqHandler}>Delete Request</button>
      <button onclick={delConHandler}>Delete Connection</button>
    </div>
  );
};
//exports component to be used on pages involved in connection requests 
export default ConnectionButtons;
