import React from 'react';
import { connect } from 'react-redux';

import './profile_show.css';
import NavBar from '../navbar/navbar_container';

const ProfileShow = props => {
  const { currentUser } = props;

  return (
    <>
      <NavBar />
      <div className="userProfile-main">
        <div className="upm-profileDetails">
          <div className="profile-banner"></div>
          <div className="profile-pic"></div>
          <h3>{currentUser.username}</h3>
        </div>

        {/* <div className="upm-pinnedRecipes">
          <h4>Pinned Recipes (2)</h4>
          <ul>
            <li>
              <img src="" alt="" />
              <div>
                <p>Test 1</p>
                <p>35 minutes</p>
              </div>
            </li>
            <li>
              <img src="" alt="" />
              <div>
                <p>Test 2</p>
                <p>10 minutes</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="upm-uploadedRecipes">
          <h4>Recipes (0)</h4>
          <ul></ul>
        </div> */}

      </div>
    </>
  )
}

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: session.user,
  }
}

export default connect(mSTP)(ProfileShow);