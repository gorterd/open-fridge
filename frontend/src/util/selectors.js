export const recipeComments = ({ entities: { recipes, comments } }, recipeId) => {
  let recipe = recipes[recipeId];
  return (recipe && recipe.comments) ? (
    recipe.comments.map( commentId => comments[commentId])
  ) : null
}