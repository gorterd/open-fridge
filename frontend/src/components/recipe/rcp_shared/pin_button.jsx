import React from 'react';
import { connect} from 'react-redux';

import { BsPlusCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa'

import { pinRecipe, unpinRecipe } from '../../../actions/recipe_actions';
import './pin_button.scss'
import { Link } from 'react-router-dom';
import { closeModal } from '../../../actions/modal_actions';

const PinButton = ({recipeId, pinned, loggedOut, pinRecipe, unpinRecipe }) => {

  const klass = `rp-pin-button ${pinned ? 'pinned' : 'unpinned'}`;
  const clickHandler = () => pinned ? unpinRecipe(recipeId) : pinRecipe(recipeId);

  const icon = pinned && !loggedOut ? 
    <FaCheckCircle className="rp-pin-icon" size={25} /> :
    <BsPlusCircleFill className="rp-pin-icon" size={25} />;

  let text = pinned ? 'Remove pinned recipe' : 'Pin this recipe';
  if (loggedOut) {
    text = "Log in to pin this recipe";
  }
  
  const span = <span className="rp-pin-text">{text}</span>;

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

export default connect(mapState, mapDispatch)(PinButton);
