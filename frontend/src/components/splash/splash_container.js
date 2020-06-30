import { connect } from 'react-redux';

import Splash from './splash';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchRecipes, clearRecipes } from '../../actions/recipe_actions';

const mSTP = ({ entities: { recipes } }, ownProps) => ({
    recipes: Object.values(recipes),
    prevPath: ownProps.location.pathname
});

const mDTP = dispatch => ({
  fetchRecipes: query => dispatch(fetchRecipes(query)),
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  clearRecipes: () => dispatch(clearRecipes()),
});

export default connect(mSTP, mDTP)(Splash);