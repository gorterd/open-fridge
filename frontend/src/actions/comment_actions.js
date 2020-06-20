import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
})

export const addComment = comment => dispatch => {
  return CommentAPIUtil.addComment(comment)
    .then(res => {
      dispatch(receiveComment(res.data));
    },
      () => console.log('Could not add comment'));
  }
  
  export const deleteComment = commentId => dispatch => {
    return CommentAPIUtil.deleteComment(commentId)
    .then(res => {
        dispatch(removeComment(res.data))
      },() => console.log('Could not delete comment'));
}