import React from 'react';

import './splash.css';
import { FaSearch, FaGithub } from "react-icons/fa";

class Splash extends React.Component {
  render() {
    return (
      <div className="splash-main">
        <div className="splash-main-searchbar">
          <form className="sms-searchForm">
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
            <li></li>
            <li></li>
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
            <a href="https://github.com/gorterd/open-fridge" target="_blank">
              <FaGithub />
            </a>
          </div>
          <div className="smf-promo-links">
            <ul className="teamMembers">
              {/* links for linkedin, etc. */}
              <li>Daniel Gorter</li>
              <li>Eric Lo</li>
              <li>Keely Lee</li>
              <li>Tieulam Thai</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;