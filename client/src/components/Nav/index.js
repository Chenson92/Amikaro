import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import amikaroLogo from "../../assest/amikaro.png";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          {/* <li className="mx-1">
            <Link to="/Booking">Booking</Link>
          </li> */}
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          {/* <span role="img" aria-label="green heart">
          💚
        </span>
        Amikaro */}
          <img
            src={amikaroLogo}
            alt="Amikaro Logo"
            style={{ height: "10vh", marginLeft: "5vh", marginRight: "5vh" }} // Adjust the height and any other styles as needed
          />
        </Link>
      </h1>
      <ul className="flex-row">
        <li className="mx-1">
          <Link to="/introduction">Introduction</Link>
        </li>
        <li className="mx-1">
          <Link to="/addevent">Create Event</Link>
        </li>
        <li className="mx-1">
          <Link to="/donation">Give</Link>
        </li>
      </ul>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
