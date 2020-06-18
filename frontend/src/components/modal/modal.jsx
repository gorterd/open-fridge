import React from "react";
import { connect } from "react-redux";
import "./modal.css";

import { closeModal } from '../../actions/modal_actions';
import RecipePreview from '../recipe/recipe_preview';

function Modal({ modal, closeModal }) {
  if (!modal.type) {
    return null;
  }
  let component;
  switch (modal.type) {
    case "recipePreview":
      component = <RecipePreview />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mSTP = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mSTP, mDTP)(Modal);
