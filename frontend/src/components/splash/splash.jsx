import React from 'react';

import NavBar from '../navbar/navbar';
import './splash.css';
import { FaSearch, FaGithub } from 'react-icons/fa';
import { GrNext, GrPrevious } from 'react-icons/gr';

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    }
    this.update = this.update.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // debugger;
    this.props.fetchRecipes({"num": "24"});
  }

  update(e) {
    const { value } = e.target;
    let searchTerms;
    if (value.split(", ").length > 1) {
      searchTerms = value.split(", ");
    } else {
      searchTerms = value.split(" ");
    }
    searchTerms = { "ingredients": searchTerms };
    this.setState({ query: searchTerms });
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.fetchRecipes(this.state.query);
    this.setState.query = "";
  }

  render() {
    const { recipes, openModal } = this.props;
    
    const RecipeItem = props => {
      const { recipe } = props;
      return (
        <li className="splashGrid-item" key={recipe._id}>
          <button
            type="button"
            onClick={() => {
              openModal({ type: "recipePreview", data: recipe });
            }}
          >
            <img
              className="splashGrid-recipeImg"
              src={recipe.image}
              alt="recipe-img"
            ></img>
            <h3 className="splashGrid-recipeName">{recipe.name}</h3>
          </button>
        </li>
      )
    };

    const recipesPart1 = recipes.slice(0, 8);
    const recipesPart2 = recipes.slice(8, 16);
    const recipesPart3 = recipes.slice(16, 24);

    const recipeSlide1 = recipesPart1.map(recipe => <RecipeItem recipe={recipe}/>);
    const recipeSlide2 = recipesPart2.map(recipe => <RecipeItem recipe={recipe}/>);
    const recipeSlide3 = recipesPart3.map(recipe => <RecipeItem recipe={recipe}/>);

    const recipesCarousel = (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={3}
      >
        <Slider>
          <Slide className="carouselSlide" index={0}>
            {recipeSlide1}
          </Slide>
          <Slide className="carouselSlide" index={1}>
            {recipeSlide2}
          </Slide>
          <Slide className="carouselSlide" index={2}>
            {recipeSlide3}
          </Slide>
        </Slider>

        <ButtonBack className="carouselButton">
          <GrPrevious />
        </ButtonBack>
        <ButtonNext className="carouselButton">
          <GrNext />
        </ButtonNext>
      </CarouselProvider>
    );

    return (
      <>
        <NavBar />

        <div className="splash-main">
          <div className="splash-main-searchbar">
            <form className="sms-searchForm">
              <input
                type="search"
                name="ingredients"
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
            <div className="smc-recipes">{recipesCarousel}</div>
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
