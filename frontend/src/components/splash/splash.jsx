import React from 'react';

import NavBar from '../navbar/navbar_container';
import './splash.css';
import { FaSearch, FaGithub } from "react-icons/fa";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // testing fetching recipe
    this.props.fetchRecipe("5ee7fc07ba311916faf4b571");
  }

  handleSearch(e) {
    e.preventDefault();
  }

  render() {
    const { recipes, openModal, fetchRecipe } = this.props;
    let recipeGrid;

    if (Object.keys(recipes).length === 0) {
      // testing fetching recipe
      return (
        <button onClick={() => fetchRecipe("5ee7fc07ba311916faf4b571")}>Loading...</button>
      )
    } else {
      recipeGrid = recipes.map(recipe => {
        const recipeImg = <img src={recipe.image}></img>;
        return <li>
          <button
            type="button"
            onClick={() => openModal("recipePreview")}
          >
            {recipeImg}
            More info
          </button>
        </li>;
      });
    };

    return (
      <>
        <NavBar />

        <div className="splash-main">
          <div className="splash-main-searchbar">
            <form className="sms-searchForm" onSumbit={this.handleSearch}>
              <input type="search" placeholder="Search" />
              <button type="button">
                <FaSearch />
              </button>
            </form>
          </div>

          <div className="splash-main-recipes">
            <h2>Explore trending recipes</h2>
            <ul className="smc-trendingRecipes">
              {/* list of recipes */}
              <li>
                <button
                  type="button"
                  onClick={() => openModal("recipePreview")}
                >
                  More info
                </button>
              </li>
              {recipeGrid}
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
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