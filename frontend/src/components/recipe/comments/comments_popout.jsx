import React from 'react';
import Comments from './comments'

class CommentsPopout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false,
    }
    this.disableBlur = false

    this.handleBlur = this.handleBlur.bind(this);
    this.toggleBubble = this.toggleBubble.bind(this);
  };

  toggleBubble() {
    this.disableBlur = true;
    this.setState({ display: !this.state.display })
  }

  handleBlur() {
    this.disableBlur = false;
    window.setTimeout(() => {
      if (!this.disableBlur) {
        this.setState({ display: false });
      }

      this.disableBlur = false;
    }, 10)
  }

  render() {

    const commentsBubble = this.state.display ? (
      // <span>HELOLALKSDJLAKSDJ</span>
      <Comments {...this.props}/>
    ) : null;

    return (
      <div className={'comments-container' + (this.state.display ? ' active':'')}>
        <span>{this.props.spanContent}</span>
        <button className='recipe-comments-popout' onBlur={this.handleBlur}>
          <span onClick={this.toggleBubble}>
            <i className="far fa-comment-alt">
              <span className='comment-balloon-content'>
                {this.props.comments ? this.props.comments.length : '+'}
              </span>
            </i>
          </span>
          <div className='recipe-comments-bubble' onClick={() => this.disableBlur = true }>
            {commentsBubble}
          </div>
        </button>
      </div>
    )
  }
};

export default CommentsPopout;