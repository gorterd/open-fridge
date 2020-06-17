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
    this.props.fetchRecipes({"num": "6"});
  }

  handleSearch(e) {
    e.preventDefault();
    
  }

  render() {
    const { recipes, openModal } = this.props;

    const recipeGrid = recipes.map(recipe => {
      // refactor to include img as background on li element
      // const recipeImg = <img className="splashGrid-recipeImg" src={recipe.image}></img>;
      return (
        <li className="splashGrid-item" key={recipe._id}>
          <button
            type="button"
            onClick={() => {
              openModal({ type: "recipePreview", data: recipe });
            }}
          >
            <img className="splashGrid-recipeImg" src={recipe.image}></img>
            <h3>{recipe.name}</h3>
          </button>
        </li>
      );
    })

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
              {recipeGrid}
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
