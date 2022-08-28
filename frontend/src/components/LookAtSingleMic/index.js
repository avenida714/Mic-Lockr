//lookAtSingleMic component

import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';


import { fetchMicsThunk } from "../../store/mics";

import { destroyMicThunk } from '../../store/mics';
import AddComment from '../AddComment';

// import { fetchCommentsThunk } from '../../store/comments';

import Comments from '../Comments';

import './LookAtSingleMic.css'

function LookAtSingleMic() {


  const micId = useParams().micId;
  const dispatch = useDispatch();
  const mics = useSelector(state => state.mics)

  const currentlyViewingThisMic = mics[micId]
  // console.log('this is the mic ------> ',currentlyViewingThisMic)

  const personLoggedIn = useSelector(state => state.session.user)
  // console.log('this is the user logged in ------>', personLoggedIn)
  const history = useHistory()



useEffect(() => {
  dispatch(fetchMicsThunk())
}, [dispatch])




// const deleteThisMic = function (micForDestruction){
//   dispatch(destroyMicThunk(micForDestruction))
// }

const deleteThisMic = async function (micForDestruction){
  dispatch(destroyMicThunk(micForDestruction))
  // (() => history.push('/'))
}

//~~~~~~~~~~~~~Delete button logic -------------
let deleteButton;

const thisIsMyMic = currentlyViewingThisMic.userId === personLoggedIn.id

if (thisIsMyMic)  {
  deleteButton = (<button onClick={
    () => deleteThisMic(currentlyViewingThisMic)
  .then(history.push('/'))}>Delete This Mic</button> )
  } else {
    deleteButton = null
  }

  //if (window.confirm('Are you sure you wish to delete this item?'))
// {currentlyViewingThisMic.userId === personLoggedIn.id ? <button onClick={
//   () => deleteThisMic(currentlyViewingThisMic)}>Delete This Mic</button> : null}



//~~~~~~~~~~~~EDIT BUTTON logic

let editButton;

if (thisIsMyMic) {
  editButton = (<button onClick={
    () => history.push(`/mics/${currentlyViewingThisMic.id}/edit`)}>Edit This Mic</button> )
} else {
  editButton = null;
}


//~~~~~~~~~~~COMMENT BUTTON logic

const [showCommentForm, setShowCommentForm] = useState(false)

let commentButton

if (personLoggedIn) {
  commentButton = (<button onClick={() => setShowCommentForm(true)}>Write A Comment</button> )
}



  return personLoggedIn && (
    <div className='mostOuterDiv'>
      <div className='singleMicDiv'>
      <img className='micImage' src={currentlyViewingThisMic?.imageURL} alt={currentlyViewingThisMic?.title}  onClick={() => history.push('/')}></img>
      <h1>{currentlyViewingThisMic.title}</h1>
      <h2>{currentlyViewingThisMic.description}</h2>
    </div>
    {editButton}
    {deleteButton}
    <Comments />
    {commentButton}
    {showCommentForm && (
      <AddComment />
    )}
    </div>

  )
}

export default LookAtSingleMic
