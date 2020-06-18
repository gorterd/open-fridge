import React from 'react';

import NavBar from '../navbar/navbar_container';
import './splash.css';
import { FaSearch, FaGithub } from "react-icons/fa";

// NEED TO FIX:
// recipes showing up twice once you navigate to recipe show page and back 
// recipe is stored in state

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes({"num": "8"});
  }

  update(e) {
    const { value } = e.target;
    this.setState({ query: {"ingredients": [value], "num": "8"} });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.clearRecipes();
    this.props.fetchRecipes(this.state.query);
    this.setState({query: {}});
  }

  render() {
    const { recipes, openModal } = this.props;
    const recipeGrid = recipes.map(recipe => {
      return (
        <li className="splashGrid-item" key={recipe._id}>
          <button
            type="button"
            onClick={() => {
              openModal({ type: "recipePreview", data: recipe });
            }}
          >
            <img className="splashGrid-recipeImg" src={recipe.image} alt="recipe-img"></img>
            <h3 className="splashGrid-recipeName">{recipe.name}</h3>
          </button>
        </li>
      );
    })

    return (
      <>
        <NavBar />

        <div className="splash-main">
          <div className="splash-main-searchbar">
            <form className="sms-searchForm">
              <input
                type="search"
                placeholder="Search by ingredients or dish name"
                onChange={this.update}
              />
              <button type="submit" onClick={this.handleSearch}>
                <FaSearch />
              </button>
            </form>
          </div>

          <div className="splash-main-recipes">
            <h2>Explore recipes</h2>
            <ul className="smc-trendingRecipes">{recipeGrid}</ul>
          </div>

          <div className="splash-main-tagline">
            <p>"Tagline here. No ingredients left behind. Blah blah."</p>
          </div>

          <div className="splash-main-footer">
            <div className="smf-social">
              <a
                href="https://github.com/gorterd/open-fridge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
            <div className="smf-promo-links">
              <ul className="teamMembers">
                {/* add links for linkedin, etc. */}
                <li>Daniel Gorter</li>
                <li>Eric Lo</li>
                <li>Keely Lee</li>
                <li>Tieulam Thai</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Splash;
