import React, { useState } from "react";
//imports react bootstap tags t structure/style component
import { Form, Button, Alert } from "react-bootstrap";
//imports needed for photo upload mutation
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../utils/mutations";
//uuid to assign unique ids for the photos users upload
import { v4 as uuidv4 } from "uuid";

//function to create/structure/ style the functioning photo upload component
const UploadFile = () => {
  //set state for mutations
  const [mutate, { loading, error }] = useMutation(UPLOAD_FILE);
  const [newUpload, setNewUpload] = useState({
    file: {},
  });
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    //structures photo data; unique id assigned here
    if (validity.valid) {
      var newFile = new File([file], uuidv4(), {
        type: file.type,
        lastModified: file.lastModified,
      });
      setNewUpload(newFile);
    }
  };
// handles the submited/uploaded photo
  const handleInputSubmit = (event) => {
    event.preventDefault();
    mutate({ variables: { file: newUpload } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <Form.Group className="imgInput">
        <Form.Label htmlFor="input" className="inputText">
          Upload Pictures Here!
        </Form.Label>
        <Form.Control
          type="file"
          name="input"
          onChange={onChange}
          required
          accept="image/png, image/gif, image/jpeg"
        />
        <Button type="submit" onClick={handleInputSubmit}>
          Submit
        </Button>
      </Form.Group>
    </React.Fragment>
  );
};
//exports photo upload component to be rendered to dashboard
export default UploadFile;
