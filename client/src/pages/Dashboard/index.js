import React from "react";
import { useQuery } from "@apollo/client";
import DashboardComponent from "../../components/Dashboard";
import "../../styles/dashboard.css";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import { QUERY_BIO } from "../../utils/queries";
import { QUERY_PREFERENCE } from "../../utils/queries";
import SignupPage from "../SignupPage";

const Dashboard = () => {
  const { loading: bioLoading, data: bioData } = useQuery(QUERY_BIO, {
    fetchPolicy: "network-only",
  });
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    fetchPolicy: "network-only",
  });
  const { loading: preferenceLoading, data: preferenceData } =
    useQuery(QUERY_PREFERENCE);

  const myBio = bioData?.bio || {};
  const myUser = userData?.me || {};
  const myPreference = preferenceData?.preference || {};

  const navigate = useNavigate();
  if (!auth.loggedIn()) {
    navigate("/login");
    return <SignupPage />;
  } else {
    if (!myBio || !myPreference || !myUser) {
      return <h1>Please Update Your Bio and Preferences</h1>;
    }
    if (bioLoading || preferenceLoading || userLoading) {
      return <div> Loading...</div>;
    }
    return (
      <div className="dashpage">
        <h1 id="dashwelcome"> Welcome, {myUser.username}!</h1>
        <div>
          <DashboardComponent
            myBio={myBio}
            myUser={myUser}
            myPreference={myPreference}
          />
        </div>
      </div>
    );
  }
};

export default Dashboard;
