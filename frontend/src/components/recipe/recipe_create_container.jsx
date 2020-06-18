import { connect } from "react-redux";
import RecipeCreate from "./recipe_create"
import { createNewRecipe, clearRecipeErrors } from "../../actions/recipe_actions";

const mSTP = state => ({
  errors: state.errors.recipe
});

const mDTP = dispatch => ({
  createRecipe: (recipe) => dispatch(createNewRecipe(recipe)),
  clearErrors: () => dispatch(clearRecipeErrors()),
});

const RecipeCreateContainer = connect(mSTP, mDTP)(RecipeCreate)
export default RecipeCreateContainer;