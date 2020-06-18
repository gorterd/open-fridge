import React from 'react';
import { Link } from 'react-router-dom';

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleChange(e){
    this.setState({ text: e.target.value})
  }

  handleClick(){
    const {text} = this.state;
    const { sectionKey: key, idx, recipeId } = this.props;

    this.props.addComment({ 
      recipe: recipeId, 
      text, 
      section: { key, idx } 
    }).then( () => this.setState({ text: ''}));
  }

  render() {
    const { comments, loggedIn } = this.props;

    const commentForm = loggedIn ? (
      <>
        <span>Add comment: </span>
        <textarea value={this.state.text} onChange={this.handleChange} />
      </>
    ) : <>
      <Link className='link-login' to='/login'>Login</Link> to comment
    </>;

    return (
      <div className='recipe-comments'>
        <ul>
          { comments ? comments.map(comment => (
            <li key={comment._id}>
              <span className='comment-text'>{comment.text}</span>
              <span className='comment-author'>{comment.author}</span>
            </li>
          )) : null}
        </ul>
        {commentForm}
      </div>
    )
  }
};

export default Comments;