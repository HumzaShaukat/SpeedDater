import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BIO = gql`
  mutation addBio(
    $interests: [String]!
    $bio: String!
    $age: Int!
    $gender: String!
    $location: String!
  ) {
    addBio(
      interests: $interests
      bio: $bio
      age: $age
      gender: $gender
      location: $location
    ) {
      interests
      bio
      age
      gender
      location
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation updateBio(
    $interests: [String]!
    $bio: String!
    $age: Int!
    $gender: String!
    $location: String!
  ) {
    updateBio(
      interests: $interests
      bio: $bio
      age: $age
      gender: $gender
      location: $location
    ) {
      interests
      bio
      age
      gender
      location
    }
  }
`;

export const ADD_PREFERENCE = gql`
  mutation addPreference(
    $ageMin: Int!
    $ageMax: Int!
    $sexOrientation: String!
    $gender: String!
    $location: String!
  ) {
    addPreference(
      ageMin: $ageMin
      ageMax: $ageMax
      sexOrientation: $sexOrientation
      gender: $gender
      location: $location
    ) {
      ageMin
      ageMax
      sexOrientation
      gender
      location
    }
  }
`;
export const UPDATE_PREFERENCE = gql`
  mutation updatePreference(
    $ageMin: Int!
    $ageMax: Int!
    $sexOrientation: String!
    $gender: String!
    $location: String!
  ) {
    updatePreference(
      ageMin: $ageMin
      ageMax: $ageMax
      sexOrientation: $sexOrientation
      gender: $gender
      location: $location
    ) {
      ageMin
      ageMax
      sexOrientation
      gender
      location
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const ADD_CONNECTION = gql`
  mutation addConnection($userId: ID!) {
    addConnection(userId: $userId) {
      connectRequest {
        _id
      }
    }
  }
`;

export const ACCEPT_CONNECTION = gql`
  mutation acceptConnection($userId: ID!) {
    acceptConnection(userId: $userId) {
      connectRequest {
        _id
      }
      connections {
        _id
      }
    }
  }
`;

export const DELETE_REQUEST = gql`
  mutation deleteConnectionRequest($userId: ID!) {
    deleteConnectionRequest(userId: $userId) {
      connectRequest {
        _id
      }
    }
  }
`;

export const DELETE_CONNECTION = gql`
  mutation deleteConnection($userId: ID!) {
    deleteConnection(userId: $userId) {
      connections {
        _id
      }
    }
  }
`;
