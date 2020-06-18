import { connect } from "react-redux";
import ProfileShow from "./profile_show"
import { fetchPinnedRecipes, fetchOwnRecipes } from "../../util/recipe_api_util.js";

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: session.user,
  };
};

const mDTP = dispatch => ({
  fetchPinnedRecipes: userId => dispatch(fetchPinnedRecipes(userId)),
  fetchOwnRecipes: userId => dispatch(fetchOwnRecipes(userId))
})

export default connect(mSTP, mDTP)(ProfileShow);
