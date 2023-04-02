import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_BIO } from "../../utils/queries";
import UploadFile from "../../components/inputTest";
import auth from "../../utils/auth";

const UploadPicturePage = () => {
  auth.checkAuth();
  const { loading, data } = useQuery(QUERY_BIO);
  const me = data?.bio.pictures || {};
  //attempting dynamic rendering
  return (
    <div className="imgUpload">
      <h1>Picture Upload</h1>
      <UploadFile />
      {loading ? <h3>loading</h3> : null}
      {me.pictures &&
        me.pictures.map((picture) => {
          return <img src={picture} className="preview"></img>;
        })}
    </div>
  );
};

export default UploadPicturePage;
