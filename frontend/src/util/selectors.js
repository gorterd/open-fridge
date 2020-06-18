export const recipeComments = ({ entities: { recipes, comments } }, recipeId) => {
  // return Object.values(state.entities.comments)
  //   .filter( comment => comment.recipe === recipeId);
  let recipe = recipes[recipeId];
  return (recipe && recipe.comments) ? (
    recipe.comments.map( commentId => comments[commentId])
  ) : null
}