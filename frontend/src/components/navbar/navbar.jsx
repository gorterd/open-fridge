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

        <div className="navbar-left">
          <button className="signupButton sessionButton">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="loginButton sessionButton">
            <Link to="/login">Log In</Link>
          </button>
        </div>

      </div>
    );
  }
}

export default NavBar;