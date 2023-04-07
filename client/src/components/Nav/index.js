import React from "react";
//imports auth helper
import auth from "../../utils/auth";
//imports corresponding css styling file
import "../../styles/nav.css";
//imports application's logo
import logo from "../../image/logo.png";
//imports needed to assist with routing
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//function to create the nav bar
function Navigation() {
  const navigate = useNavigate();
  //function for user log out
  function userLogout() {
    auth.logout();
  }
  //returns functiong styled/structured nav bar
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          <div className="icon">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Find Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chat">
                  Chat
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/editbio">
                  Edit Bio
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/editpreference">
                  Edit Preferences
                </Link>
              </li>
              {auth.loggedIn() ? (
                <li className="nav-item">
                  <Link className="nav-link" onClick={userLogout} to="/login">
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

//exports the nav generating function
export default Navigation;
