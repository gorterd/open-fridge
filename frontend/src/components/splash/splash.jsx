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
  WithStore
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const _defaultSlides = Array.from(Array(50), i => null);

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      imagesLoading: true,
      slides: _defaultSlides
    }

    this.slideIdx = 0;
    this.maxIdx = 2;

    this.update = this.update.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.props.clearRecipes();
    this.props.fetchRecipes({"num": "24"}).then( () => {
      this.setState({ slides: this._generateSlides(), imagesLoading: false });
    });
  }

  componentDidUpdate(prevProps){
    const { recipes } = this.props;
    if ( recipes.length > prevProps.recipes.length && recipes.length > 24 ){
      this.maxIdx += 3;
      this.setState({ slides: this._generateSlides() });
    }
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
    this.setState({ imagesLoading: true, slides: _defaultSlides })
    this.props.clearRecipes();
    this.maxIdx = 2;
    this.slideIdx = 0;

    this.props.fetchRecipes({"num": "24", ...this.state.query}).then( () => {
      this.setState({ slides: this._generateSlides(), imagesLoading: false });
    });
  }

  handlePrev(){
    if (this.slideIdx > 0){
      this.slideIdx += 1;
    }
  }

  handleNext(){
    let numRecipes = ( this.maxIdx + 1 ) * 8;

    if (this.slideIdx + 2 < this.maxIdx ){
      this.slideIdx += 1;
    } else if (this.slideIdx + 2 === this.maxIdx) {
      this.slideIdx += 1;
      this.props.fetchRecipes({ 
        "num": "24", 
        "skip": numRecipes, 
        ...this.state.query
      });
    } 
  }

  _generateSlides(){
    const { recipes, openModal } = this.props;

    let newSlides = Array.from(this.state.slides);
    let i = this.maxIdx - 2;

    while (i <= this.maxIdx) {
      newSlides[i] = (recipes[i * 8]) ?
        recipes.slice(i * 8, (i + 1) * 8).map(recipe => <RecipeItem key={recipe._id} recipe={recipe} openModal={openModal} />)
        : <></>;
      i++;
    }

    return newSlides;
  }

  render() {
    const { imagesLoading } = this.state;
    
    const recipesCarousel = (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={50}
        hasMasterSpinner={imagesLoading}
      >
        <Slider>
          { this.state.slides.map( (content, idx) => {
            return <Slide key={idx} className="carouselSlide" index={idx}>{content}</Slide>
          })}
        </Slider>

        <ResetCarousel reset={imagesLoading} />

        <ButtonBack className="carouselButton" onClick={this.handlePrev}>
          <GrPrevious />
        </ButtonBack>
        <ButtonNext className="carouselButton" onClick={this.handleNext}>
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
            <p>"No ingredients left behind, open your fridge."</p>
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

const RecipeItem = props => {
  const { recipe, openModal } = props;
  return (
    <div className="splashGrid-item">
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
    </div>
  )
};

class Reset extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.reset && this.props.reset) {
      this.props.carouselStore.setStoreState({ currentSlide: 0 });
    }
  }

  render() {
    return <> </>
  }
};

const ResetCarousel = WithStore(Reset);

export default Splash;
