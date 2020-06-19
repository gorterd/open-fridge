import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './recipe_preview.css';
import { closeModal } from '../../actions/modal_actions';

// fix the modal design, resize images 

const RecipePreview = props => {
  const { currentRecipe, closeModal } = props;

  return (
    <>
      <div className="recipePreview-main">
        <img className="rpm-img" src={currentRecipe.image} alt="recipe-img" />

        <div className="rpm-time">{currentRecipe.time.total}</div>

        <h3>{currentRecipe.name}</h3>

        <ul className="rpm-ingredientsList">
          {currentRecipe.ingredients.map((ingredient) => (
            <li key={ingredient._id}>{ingredient.fullName}</li>
          ))}
        </ul>

        <div className="rpm-servings">Servings: {currentRecipe.servings}</div>

        <div className="rpm-navLinks">
          <Link
            to={`/recipes/${currentRecipe._id}`}
            onClick={() => closeModal()}
          >
            View Recipe
          </Link>
        </div>
      </div>
    </>
  );
}

const mSTP = ({ ui: { modal }}) => ({
  currentRecipe: modal.data,
})

const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
})

export default connect(mSTP, mDTP)(RecipePreview);