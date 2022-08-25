//lookAtSingleMic component

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';

import { fetchMicsThunk } from "../../store/mics";

import { destroyMicThunk } from '../../store/mics';

import { fetchCommentsThunk } from '../../store/comments';

import Comments from '../Comments';


function LookAtSingleMic() {


  const micId = useParams().micId;
  const dispatch = useDispatch();
  const mics = useSelector(state => state.mics)

  const currentlyViewingThisMic = mics[micId]
  console.log('this is the mic ------> ',currentlyViewingThisMic)

  const personLoggedIn = useSelector(state => state.session.user)
  // console.log('this is the user logged in ------>', personLoggedIn)
  const history = useHistory()



useEffect(() => {
  dispatch(fetchMicsThunk())
  dispatch(fetchCommentsThunk())
}, [dispatch])




// const deleteThisMic = function (micForDestruction){
//   dispatch(destroyMicThunk(micForDestruction))
// }

const deleteThisMic = async function (micForDestruction){
  dispatch(destroyMicThunk(micForDestruction))
  .then(() => history.push('/'))
}

//~~~~~~~~~~~~~Delete button logic -------------
let deleteButton;

const thisIsMyMic = currentlyViewingThisMic.userId === personLoggedIn.id

if (thisIsMyMic)  {
  deleteButton = (<button onClick={
    () => deleteThisMic(currentlyViewingThisMic)}>Delete This Mic</button> )
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



  return personLoggedIn && (
    <>
      <span>
      <img id="micImage" src={currentlyViewingThisMic?.imageURL} alt={currentlyViewingThisMic?.title} height="850px" onClick={() => history.goBack()}></img>
      <h1>{currentlyViewingThisMic.title}</h1>
      <h2>{currentlyViewingThisMic.description}</h2>
    </span>
    {editButton}
    {deleteButton}
    <Comments />
    </>

  )
}

export default LookAtSingleMic
