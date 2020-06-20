import React from 'react';
import { connect} from 'react-redux';

import { BsPlusCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa'

import { pinRecipe, unpinRecipe } from '../../../actions/recipe_actions';
import './expanding_buttons.scss'
import { Link } from 'react-router-dom';
import { closeModal } from '../../../actions/modal_actions';

const PinButtonPresentational = ({recipeId, pinned, loggedOut, pinRecipe, unpinRecipe, closeModal }) => {

  const klass = 'expanding-button';
  const clickHandler = () => pinned ? unpinRecipe(recipeId) : pinRecipe(recipeId);

  const icon = pinned && !loggedOut ? 
    <FaCheckCircle className="expanding-button-icon" size={25} /> :
    <BsPlusCircleFill className="expanding-button-icon" size={25} />;

  let text = pinned ? 'Remove pinned recipe' : 'Pin this recipe';
  if (loggedOut) {
    text = "Log in to pin this recipe";
  }
  
  const span = <span className="expanding-button-text">{text}</span>;

  return loggedOut ? (
    <Link to="/login" className={klass} onClick={() => closeModal()}>
      {icon}
      {span}
    </Link>
  ) : (
    <button className={klass} onClick={clickHandler}>
      {icon}
      {span}
    </button>
  ); 
}

const mapState = ({ session }, { recipeId }) => {
  return {
    pinned: session.pinnedRecipes.includes(recipeId),
    loggedOut: !session.isAuthenticated
  }
}

const mapDispatch = dispatch => {
  return {
    pinRecipe: recipeId => dispatch(pinRecipe(recipeId)),
    unpinRecipe: recipeId => dispatch(unpinRecipe(recipeId)),
    closeModal: () => dispatch(closeModal())
  }
}

export const PinButton = connect(mapState, mapDispatch)(PinButtonPresentational);

export const CreateRecipeButton = () => {

  return (
    <Link to="/new-recipe" className="expanding-button">
      <BsPlusCircleFill className="expanding-button-icon" size={25} />
      <span className="expanding-button-text">Create a recipe</span>
    </Link>
  );
}


