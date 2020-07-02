import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './navbar.css';
import { logout } from '../../actions/session_actions';
import { CreateRecipeButton } from '../recipe/rcp_shared/expanding_buttons'

const NavBar = props => {
  const { currentUser, logout, prevPath } = props;
  let history = useHistory();
  
  const logOut = () => { 
    logout();
    history.push("/");
  }

  
  const navbarRight = !currentUser ? (
    <>
      <Link className="sessionButton" 
        to={{
          pathname: "/signup",
          state: { prevPath } 
        }}>
        Sign Up
      </Link>
      <Link className="sessionButton" 
        to={{
          pathname: '/login',
          state: { prevPath }
        }}>
        Log In
      </Link>
    </>
  ) : (
    <>
      <div className="nbr-uploadContainer">
        <CreateRecipeButton />
      </div>
      <p>
        Welcome,{" "}
        <Link to={`/users/${currentUser.id}`}>{currentUser.username}</Link>
      </p>
        <button onClick={logOut}>Logout</button>
    </>
  );

  return (
    <div className="navbar-main">
      <div className="navbar-left">
        <Link className="nbl-homeLink" to="/">
          <div className="nbl-logo"></div>
          openFridge
        </Link>
      </div>

      <div className="navbar-right">
        {navbarRight}
      </div>
    </div>
  );
}

const mSTP = ({ session }, ownProps) => ({
  currentUser: session.user,
  prevPath: ownProps.prevPath,
});

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(NavBar);


