import React from 'react';
import './profile_show.css';
import NavBar from '../navbar/navbar';

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPinnedRecipes(this.props.match.params.userId);
    // this.props.fetchOwnRecipes(this.props.match.params.userId)
  }

  render() {
    if (!this.props.pinnedRecipes) {
            return null;
        }; 

    return ( 
      <>
        <NavBar />
        <div className="userProfile-main">
          <div className="upm-profileDetails">
            <div className="profile-banner"></div>
            <div className="profile-pic"></div>
            <h3>{this.props.currentUser.username}</h3>
          </div>

          <div className="own-recipes"></div>
            {/* <ul>
              {this.props.pinnedRecipes.map((recipe) => (
                <li>recipe.instructions</li>
              ))}
            </ul> */}
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
    );
  }
}


export default ProfileShow;