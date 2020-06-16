import React from 'react';
import { connect } from 'react-redux';

class RecipePreview extends React.Component {
  render() {
    return (
      <div>Recipe Preview here</div>
    )
  }
}

const mSTP = state => ({
  // recipe: state.entities.recipe
})

// export default connect(mSTP)(RecipePreview);

export default RecipePreview;