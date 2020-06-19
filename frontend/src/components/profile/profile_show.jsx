import React from 'react';
import './profile_show.css';
import NavBar from '../navbar/navbar';
import { Link } from "react-router-dom";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";


class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearRecipes();
    this.props.fetchPinnedRecipes(this.props.match.params.userId);
    this.props.fetchOwnRecipes(this.props.match.params.userId)
  }

  render() {
    if (!this.props.allRecipes) {
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

          <section className="recipes-section">
            <div className="pinned-recipes">
              Pinned Recipes
              <ul className="list-recipes">
                {this.props.allRecipes.map((recipe) => {
                  if (recipe.author !== this.props.currentUser.id) {
                    return (
                      <div className="single-recipe">
                        <img src={recipe.image} alt="recipe-img"></img>
                        <li>
                          <Link to={`/recipes/${recipe._id}`} id="link">{recipe.name}</Link>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>

            <div className="own-recipes">
              Your Recipes
              <ul className="list-recipes">
                {this.props.allRecipes.map((recipe) => {
                  if (recipe.author === this.props.currentUser.id) {
                    return (
                      <div className="single-recipe">
                        <img src={recipe.image} alt="recipe-img"></img>
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
            </div>
          </section>
        </div>
      </>
    );
  }
}


export default ProfileShow;