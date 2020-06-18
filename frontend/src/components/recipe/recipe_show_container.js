import { connect } from "react-redux";
import RecipeShow from "./recipe_show";
import { addComment, deleteComment } from "../../actions/comment_actions";
import { fetchRecipe } from "../../actions/recipe_actions";
import { recipeComments } from '../../util/selectors'

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.recipeId;
  return {
    recipe: state.entities.recipes[recipeId],
    comments: recipeComments(state, recipeId),
    session: state.session,
    recipeId
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchRecipe: id => dispatch(fetchRecipe(id)),
  addComment: data => dispatch(addComment(data)),
  deleteComment: id => dispatch(deleteComment(id)),
});

const RecipeShowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeShow);

export default RecipeShowContainer;
