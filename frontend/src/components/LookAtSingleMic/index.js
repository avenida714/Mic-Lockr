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

const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchMicsThunk())
}, [dispatch])

  const micId = useParams().micId;

  const mics = useSelector(state => state.mics)

  const currentlyViewingThisMic = mics[micId]
  // console.log('this is the mic ------> ',currentlyViewingThisMic)

  const personLoggedIn = useSelector(state => state.session.user)
  // console.log('this is the user logged in ------>', personLoggedIn)
  const history = useHistory()




const deleteThisMic = async function (micForDestruction){
  dispatch(destroyMicThunk(micForDestruction))
  // (() => history.push('/'))
}

//~~~~~~~~~~~~~Delete button logic -------------
let deleteButton;


//TODO there is an issue here where refreshing will return a blank page.
let thisIsMyMic;
const matchedId = personLoggedIn.id

if (currentlyViewingThisMic) {
   thisIsMyMic = currentlyViewingThisMic.userId === matchedId
}


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



  return personLoggedIn && currentlyViewingThisMic && (
    <>

    <div className='mostOuterDiv'>
      <div className='singleMicDiv'>
      <img className='micImage' src={currentlyViewingThisMic.imageURL} alt={currentlyViewingThisMic.title}  onClick={() => history.push('/')}></img>
      <h1 className='singleMicTitle'>{currentlyViewingThisMic.title}</h1>
      <h2 className='singleMicDescription'>{currentlyViewingThisMic.description}</h2>
    </div>
    <div>
      {editButton}{deleteButton}
    </div>

    <Comments />
    {commentButton}
    {showCommentForm && (
      <AddComment />
    )}

<button href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></button>

    </div>
    <div id="preloader">
    <div class="line"></div>
  </div>
 </>
  )
}

export default LookAtSingleMic
