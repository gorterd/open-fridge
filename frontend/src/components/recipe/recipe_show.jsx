import React from 'react';
import Comments from './comments';

class RecipeShow extends React.Component {
  constructor(props) {
    super(props)
    
    this._comments = this._comments.bind(this)
  };

  componentDidMount(){
    this.props.fetchRecipe(this.props.recipeId);
  }

  _comments(key, idx){
    const {comments} = this.props;
    if (!comments) { return null };

    switch (key) {
      case "ingredients":
      case "instructions":
        return comments.some( comment => (
          comment.section.key === key &&
          comment.section.idx === idx
        ));
      case "time":
      case "servings":
      case "recipe":
        return comments.some( comment => comment.section.key === key);
      default:
        return null;
    }
  }

  render() {
    const { recipe, addComment, deleteComment, loggedIn } = this.props;

    if ( !recipe ) { return <></> };

    const image = recipe.image ? (
      <img className="recipe-image" src={recipe.image} alt="recipe-image" />
    ) : null;

    const author = recipe.author ? (
      <span className="recipe-author">Submitted by {recipe.author}</span>
    ) : null;

    const ingredients = recipe.ingredients.map( (ingredient, idx) => (
      <li key={ingredient._id}>
        <span>{ingredient.fullName}</span>
        <Comments 
          recipeId={recipe._id}
          sectionKey='ingredients'
          idx={idx}
          comments={this._comments('ingredients', idx)}
          loggedIn={loggedIn}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </li>
    ));

    const instructions = recipe.instructions.map((instruction, idx) => (
      <li key={idx}>
        <span>{instruction}</span>
        <Comments
          recipeId={recipe._id}
          sectionKey='instructions'
          idx={idx}
          comments={this._comments('instructions', idx)}
          loggedIn={loggedIn}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </li>
    ));

    return (
      <section className='recipe-container'>
        {image}

        <h1>{recipe.name}</h1>
        {author}

        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>{ingredients}</ul>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <ul>{instructions}</ul>
        </div>

        <div className="recipe-servings">
          <span>Servings: {recipe.servings}</span>
          <Comments
            recipeId={recipe._id}
            sectionKey='servings'
            comments={this._comments('servings')}
            loggedIn={loggedIn}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </div>

        <div className="recipe-time">
          <span>Total Time: {recipe.time.total}</span>
          <Comments
            recipeId={recipe._id}
            sectionKey='time'
            comments={this._comments('time')}
            loggedIn={loggedIn}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </div>

        <div className="recipe-general-comments">
          <Comments
            recipeId={recipe._id}
            sectionKey='recipe'
            comments={this._comments('recipe')}
            loggedIn={loggedIn}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        </div>
      </section>
    )
  }
};

export default RecipeShow;