//STORE/COMMENTS

import { csrfFetch } from "./csrf"

const LOAD_COMMENTS = 'comments/LOAD'
const ADD_COMMENT = 'comments/ADD'
const DELETE_COMMENT = 'comments/DELETE'
const UPDATE_COMMENT = 'comments/UPDATE'


/* ~~~~~~~~~~~~REGULAR ACTION CREATORS ~~~~~~~~ */

const loadComments = (comments) => {
  return {
  type: LOAD_COMMENTS,
  comments
  }
}

//ac for add comment
const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

//ac to delete a comment
const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

//ac to update a comment
const updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment
  }

}



/* ~~~~~~~~~~~~THUNK ACTION CREATORS ~~~~~~~~ */


export const fetchCommentsThunk = (talkingAboutThisMic) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${talkingAboutThisMic.id}`)
  // console.log('talking about this mic -------->', talkingAboutThisMic)
  // const response = await csrfFetch(`/api/comments/`)

  // console.log('this is the response ------>', response)

  if(response.ok) {
    const comments = await response.json();
    // console.log('these are the comments ------->', comments)
    dispatch(loadComments(comments))
    console.log(comments)
    return comments;
  }
}


/* ~~~~~~~~~~~~REDUCER ~~~~~~~~ */


const commentReducer = (state = {}, action) => {
  switch (action.type) {

  case LOAD_COMMENTS:
    const commentObj = {};
    action.comments.forEach(comment => {
      commentObj[comment.id] = comment
    })
    console.log('this is the comment OBJ from the reducer ------->', commentObj)
    return commentObj;

  default:
    return state
  }
}


export default commentReducer;
