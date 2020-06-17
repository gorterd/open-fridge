import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar-main">
        <div className="navbar-left">
          <Link className="nbl-homeLink" to="/">
            openFridge
          </Link>
        </div>

        <div className="navbar-right">
          <Link className="signupButton sessionButton" to="/signup">
            Sign Up
          </Link>
          <Link className="loginButton sessionButton" to="/login">
            Log In
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;