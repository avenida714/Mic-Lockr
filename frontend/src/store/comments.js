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

//update for later
// //ac to update a comment
// const updateComment = (comment) => {
//   return {
//     type: UPDATE_COMMENT,
//     comment
//   }

// }



/* ~~~~~~~~~~~~THUNK ACTION CREATORS ~~~~~~~~ */


//GET ALL COMMENTS for 1 mic
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


//CREATE A COMMENT
export const createCommentThunk = (comment) => async dispatch => {
  const res = await csrfFetch('/api/comments/create', {
    method: 'POST',
    body: JSON.stringify(comment)
  })

  if (res.ok) {
    const comment = await res.json()
    dispatch(addComment(comment))
    return comment
  }
}

//DELETE A COMMENT

export const destroyCommentThunk = (comment) => async dispatch => {
  const res = await csrfFetch('/api/comments/delete', {
    method: 'DELETE',
    body: JSON.stringify(comment)
  })
  const removedComment = await res.json();
  dispatch(deleteComment(removedComment))
  return removedComment
}



/* ~~~~~~~~~~~~REDUCER ~~~~~~~~ */


const commentReducer = (state = {}, action) => {
  switch (action.type) {

  case LOAD_COMMENTS:
    const commentObj = {};
    action.comments.forEach(comment => {
      commentObj[comment.id] = comment
    })
    // console.log('this is the comment OBJ from the reducer ------->', commentObj)
    return commentObj;
  case ADD_COMMENT:
    return {...state, [action.comment.id]: action.comment}

  default:
    return state
  }
}


export default commentReducer;
