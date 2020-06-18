import axios from "axios";

export const addComment = comment => {
  return axios.post('/api/comments/', comment);
}

export const deleteComment = commentId => {
  return axios.delete(`/api/comments/${commentId}`);
}

