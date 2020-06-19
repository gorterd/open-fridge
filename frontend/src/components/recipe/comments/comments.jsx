import React from 'react';
import { Link } from 'react-router-dom';

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  };

  handleChange(e){
    this.setState({ text: e.target.value})
  }

  submitComment(e){
    e.preventDefault();
    const {text} = this.state;
    const { sectionKey: key, idx, recipeId } = this.props;

    this.props.addComment({ 
      recipe: recipeId, 
      text, 
      section: { key, idx } 
    }).then( () => this.setState({ text: ''}));
  }

  render() {
    const { comments, session, deleteComment } = this.props;

    const commentForm = session.isAuthenticated ? (
      <form onSubmit={this.submitComment}>
        <textarea value={this.state.text} onChange={this.handleChange} />
        <span className='submit-comment' onClick={this.submitComment}>
          Add Comment
        </span>
      </form>
    ) : <div className='prompt-signin-comment'>
      <Link className='link-login' to='/login'>Login</Link> to comment
    </div>;


    return (
      <div className='recipe-comments'>
        <ul>
          { comments ? comments.map(comment => (
            <li key={comment._id}>
              <span className='comment-text'>{comment.text}</span>
              <div className='comment-author'>
                {(session.user && session.user.id === comment.author._id) ? 
                (<span className='comment-delete' onClick={ () => {
                    deleteComment(comment._id)
                  }}><i className="fas fa-times-circle"></i></span>) : null}
                <span className='comment-username'>{comment.author.username}</span>
              </div>
            </li>
          )) : null}
        </ul>
        {commentForm}
      </div>
    )
  }
};

export default Comments;