import React from 'react';
import { connect } from 'react-redux';

const RecipePreview = props => {
  const { currentRecipe } = props;

  return (
    <div className="recipePreview-main">
      <div>
        <img src={currentRecipe.image} alt="" />
      </div>

      <div className="rpm-time">
        {currentRecipe.time.total}
      </div>

      <h3>{currentRecipe.name}</h3>

      <div className=""></div>

      <div className="rpm-ingredientsList">
        {currentRecipe.ingredients.map((ingredient) => (
          <li key={ingredient._id}>{ingredient.fullName}</li>
        ))}
      </div>

      <div className="rpm-navLinks">
        
      </div>
    </div>
  );
}

const mSTP = ({ ui: { modal }}) => ({
  currentRecipe: modal.data,
})

export default connect(mSTP)(RecipePreview);