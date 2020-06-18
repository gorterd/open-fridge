import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

class NavBar extends React.Component {
  render() {
    const { currentUser, logout } = this.props;
    
    const navbarRight = !currentUser ? (
      <div className="navbar-right">
        <Link className="signupButton sessionButton" to="/signup">
          Sign Up
          </Link>
        <Link className="loginButton sessionButton" to="/login">
          Log In
          </Link>
      </div>
    ) : (
      <div className="navbar-right">
        <p>Welcome, <Link to={`/users/${currentUser._id}`}>{currentUser.username}</Link></p>
        <button onClick={logout}>Logout</button>
      </div>
    )

    return (
      <div className="navbar-main">
        <div className="navbar-left">
          <Link className="nbl-homeLink" to="/">
            openFridge
          </Link>
        </div>

        {navbarRight}
      </div>
    );
  }
}

export default NavBar;