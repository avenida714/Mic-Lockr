//lookAtSingleMic component

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';

import { fetchMicsThunk } from "../../store/mics";

import { destroyMicThunk } from '../../store/mics';


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



const deleteThisMic = function (micForDestruction){
  dispatch(destroyMicThunk(micForDestruction))
}

//Delete button logic
let deleteButton;

//if (window.confirm('Are you sure you wish to delete this item?'))

if (currentlyViewingThisMic.userId === personLoggedIn.id)  {
  deleteButton = (<button onClick={
    () => deleteThisMic(currentlyViewingThisMic)}>Delete This Mic</button> )
} else {
  deleteButton = null
}

// {currentlyViewingThisMic.userId === personLoggedIn.id ? <button onClick={
//   () => deleteThisMic(currentlyViewingThisMic)}>Delete This Mic</button> : null}

  return (
    <>
      <span>
      <img id="micImage" src={currentlyViewingThisMic?.imageURL} alt={currentlyViewingThisMic?.title} onClick={() => history.goBack()}></img>
    </span>
    {deleteButton}
    </>

  )
}

export default LookAtSingleMic
