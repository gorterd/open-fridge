import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './navbar.css';
import { logout } from '../../actions/session_actions';

class NavBar extends React.Component {
  render() {
    const { currentUser, logout } = this.props;
    
    const navbarRight = !currentUser ? (
      <>
        <Link className="signupButton sessionButton" to="/signup">
          Sign Up
          </Link>
        <Link className="loginButton sessionButton" to="/login">
          Log In
          </Link>
      </>
    ) : (
      <>
        <p>Welcome, <Link to={`/users/${currentUser._id}`}>{currentUser.username}</Link></p>
        <button onClick={logout}>Logout</button>
      </>
    )

    return (
      <div className="navbar-main">
        <div className="navbar-left">
          <Link className="nbl-homeLink" to="/">
            openFridge
          </Link>
        </div>

        <div className="navbar-right">
          {navbarRight}
        </div>
      </div>
    );
  }
}

const mSTP = ({ session }) => ({
  currentUser: session.user,
})

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(mSTP, mDTP)(NavBar);
