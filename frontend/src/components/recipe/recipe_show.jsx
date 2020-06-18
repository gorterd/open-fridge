import React from 'react';
import Comments from './comments/comments';
import CommentsPopout from './comments/comments_popout';
import NavBar from '../navbar/navbar';
import './recipe.scss'

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
      <img className="recipe-image" src={recipe.image} alt="recipe" />
    ) : null;

    const author = recipe.author ? (
      <span className="recipe-author"><span>Submitted by</span>{recipe.author}</span>
    ) : <span className="recipe-author"><span>Source:</span>{recipe.source}</span>;

    const ingredients = recipe.ingredients.map( (ingredient, idx) => (
      <li key={ingredient._id}>
        {/* <span>{ingredient.fullName}</span> */}
        <CommentsPopout 
          spanContent={ingredient.fullName}
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
        {/* <span>{instruction}</span> */}
        <CommentsPopout
          spanContent={instruction}
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
      <section className='recipe-show-page'>
        <NavBar />
        <div className='recipe-container'>

          {image}

          <div className='recipe-information'>
            <h1>{recipe.name}</h1>
            {author}
            <span><span>Servings:</span> {recipe.servings}</span>
            <span><span>Total Time:</span> {recipe.time.total}</span>
          </div>

          <div className='recipe-main'>
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul>{ingredients}</ul>
            </div>

            <div className="recipe-instructions">
              <h2>Instructions</h2>
              <ul>{instructions}</ul>
            </div>

            <div className="recipe-servings">
              {/* <span>Servings: {recipe.servings}</span> */}
              <CommentsPopout
                spanContent={`Servings:  ${recipe.servings}`}
                recipeId={recipe._id}
                sectionKey='servings'
                comments={this._comments('servings')}
                loggedIn={loggedIn}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>

            <div className="recipe-time">
              {/* <span>Total Time: {recipe.time.total}</span> */}
              <CommentsPopout
                spanContent={`Total Time:  ${recipe.time.total}`}
                recipeId={recipe._id}
                sectionKey='time'
                comments={this._comments('time')}
                loggedIn={loggedIn}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>
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
        </div>
      </section>
    )
  }
};

export default RecipeShow;