import React from 'react';
import Comments from '../rcp_comments/comments';
import CommentsPopout from '../rcp_comments/comments_popout';
import NavBar from '../../navbar/navbar';
import './recipe_show.scss'
import { Link } from 'react-router-dom';
import { PinButton } from '../rcp_shared/expanding_buttons';


class RecipeShow extends React.Component {
  constructor(props) {
    super(props)
    
    this._comments = this._comments.bind(this)
  };

  componentDidMount(){
    window.scrollTo(0,0);
    this.props.fetchRecipe(this.props.recipeId);
  }

  _comments(key, idx){
    const {comments} = this.props;
    if (!comments) { return null };

    switch (key) {
      case "ingredients":
      case "instructions":
        return comments.filter( comment => (
          comment &&
          comment.section.key === key &&
          parseInt(comment.section.idx) === idx
        ));
      case "time":
      case "servings":
      case "recipe":
        return comments.filter( comment => ( comment && comment.section.key === key));
      default:
        return null;
    }
  }

  render() {
    const { recipe, addComment, deleteComment, session } = this.props;

    if ( !recipe ) { return <></> };

    const image = recipe.image ? (
      <img className="recipe-show-image" src={recipe.image} alt="recipe" />
    ) : null;

    const author = recipe.author ? (
      <span className="recipe-author"><span>Submitted by:</span>
        <Link to={`/users/${recipe.author}`}>{recipe.authorUsername}</Link>
      </span>
    ) : <span className="recipe-author"><span>Source:</span>
          <a href={recipe.url}>{recipe.source}</a>
        </span>;

    const ingredients = recipe.ingredients.map( (ingredient, idx) => (
      <li key={ingredient._id}>
        <CommentsPopout 
          spanContent={ingredient.fullName}
          recipeId={recipe._id}
          sectionKey='ingredients'
          idx={idx}
          comments={this._comments('ingredients', idx)}
          session={session}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </li>
    ));

    const instructions = recipe.instructions.map((instruction, idx) => (
      <li key={idx}>
        <CommentsPopout
          spanContent={<><span>{`${(idx + 1)}. `}</span><span>{instruction}</span></>}
          recipeId={recipe._id}
          sectionKey='instructions'
          idx={idx}
          comments={this._comments('instructions', idx)}
          session={session}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </li>
    ));

    return (
      <section className='recipe-show-page'>
        <NavBar prevPath={`/recipes/${this.props.recipeId}`}/>
        <div className='recipe-show-container'>

          {image}
          
          <div className='recipe-show-information'>
            <div className="rps-pinRecipe-container">
              <PinButton recipeId={recipe._id} />
            </div>
            <h1 className={recipe.name.length > 44 ? 'long-title' : ''}>{recipe.name}</h1>
            {author}
            <span><span>Servings:</span> {recipe.servings}</span>
            <span><span>Total Time:</span> {recipe.time.total}</span>
          </div>

          <div className='recipe-show-main'>
            <div className="recipe-show-ingredients">
              <h2>Ingredients</h2>
              <ul>{ingredients}</ul>
            </div>

            <div className="recipe-show-instructions">
              <h2>Instructions</h2>
              <ul>{instructions}</ul>
            </div>

            <div className="recipe-show-servings">
              <CommentsPopout
                spanContent={`Servings:  ${recipe.servings}`}
                recipeId={recipe._id}
                sectionKey='servings'
                comments={this._comments('servings')}
                session={session}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>

            <div className="recipe-show-time">
              <CommentsPopout
                spanContent={`Total Time:  ${recipe.time.total}`}
                recipeId={recipe._id}
                sectionKey='time'
                comments={this._comments('time')}
                session={session}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>
          </div>

          <div className="recipe-general-comments">
            <h2>Comments</h2>
            <Comments
              recipeId={recipe._id}
              sectionKey='recipe'
              comments={this._comments('recipe')}
              session={session}
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