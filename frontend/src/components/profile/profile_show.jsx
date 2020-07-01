import React from 'react';
import './profile_show.css';
import NavBar from '../navbar/navbar';
import { Link } from "react-router-dom";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPinned: false,
      showOwn: false
    }

    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    this.props.clearRecipes();
    this.props.fetchPinnedRecipes(this.props.match.params.userId);
    this.props.fetchOwnRecipes(this.props.match.params.userId)
  }

  toggleShow(category) {
    return () => this.setState({
      [category]: !this.state[category]
    })
  }

  render() {
    if (!this.props.allRecipes) {
      return null;
    }; 

    const { showOwn, showPinned } = this.state;

    return (
      <>
        <NavBar />

        <div className="userProfile-main">
          <div className="upm-profileDetails">
            <div className="profile-banner"></div>
            <div className="profile-pic"></div>
            <h3>{this.props.currentUser.username}</h3>
          </div>

          <section className="recipes-section">
            <div className="pinned-recipes">
              Pinned Recipes
              <ul className={"list-recipes " + (showPinned ? "show-more" : 'show-less')}>
                {this.props.allRecipes.map((recipe) => {
                  if (recipe.author !== this.props.currentUser.id) {
                    return (
                      <div className="single-recipe">
                        <div className='single-recipe-img'>
                          <img src={recipe.image} alt="recipe-img"></img>
                        </div>
                        <li>
                          <Link to={`/recipes/${recipe._id}`} id="link">
                            {recipe.name}
                          </Link>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
              <button className="button" onClick={this.toggleShow('showPinned')}>
                { showPinned ? 'show less' : 'show more'}
              </button>
            </div>

            <div className="own-recipes">
              Your Recipes
              <ul className={"list-recipes " + ( showOwn ? "show-more" : 'show-less')}>
                {this.props.allRecipes.map((recipe) => {
                  if (recipe.author === this.props.currentUser.id) {
                    return (
                      <div className="single-recipe">
                        <div className='single-recipe-img'>
                          <img src={recipe.image} alt="recipe-img"></img>
                        </div>
                        <li>
                          <Link to={`/recipes/${recipe._id}`} id="link">
                            {recipe.name}
                          </Link>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
              <button className="button" onClick={this.toggleShow('showOwn')}>
                {showOwn ? 'show less' : 'show more'}
              </button>
            </div>
          </section>
        </div>
      </>
    );
  }
}


export default ProfileShow;