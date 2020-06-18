import { connect } from "react-redux";
import ProfileShow from "./profile_show"
import { fetchPinnedRecipes, fetchOwnRecipes } from "../../actions/recipe_actions";

const mSTP = (state) => {
  return {
    currentUser: state.session.user,
    pinnedRecipes: state.entities.recipes
    // pinnedRecipes: state.entities.questions[ownProps.match.params.questionId]
  };
};

const mDTP = dispatch => {
  return {
  fetchPinnedRecipes: userId => dispatch(fetchPinnedRecipes(userId)),
  // fetchOwnRecipes: userId => dispatch(fetchOwnRecipes(userId))
  }
}

export default connect(mSTP, mDTP)(ProfileShow);
