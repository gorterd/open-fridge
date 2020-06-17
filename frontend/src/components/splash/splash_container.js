import { connect } from 'react-redux';

import Splash from './splash';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchRecipes } from '../../actions/recipe_actions';

const mSTP = ({ entities: { recipes } }) => {
  debugger;
  return {
    recipes: Object.values(recipes),
  }
}

const mDTP = dispatch => ({
  fetchRecipes: query => dispatch(fetchRecipes(query)),
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(Splash);