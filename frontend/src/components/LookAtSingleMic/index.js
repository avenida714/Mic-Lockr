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

  const history = useHistory()

  // console.log(currentlyViewingThisMic)


useEffect(() => {
  dispatch(fetchMicsThunk())
}, [dispatch])


const deleteThisMic = function (micForDestruction){
  dispatch(destroyMicThunk(micForDestruction))
    .then(() => history.push('/'))

}


  return (
    <>
      <span>
      <img id="micImage" src={currentlyViewingThisMic?.imageURL} alt={currentlyViewingThisMic?.title} onClick={() => history.goBack()}></img>
    </span>
    <button onClick={() => deleteThisMic(currentlyViewingThisMic)}>Delete This Mic</button>

    </>

  )
}

export default LookAtSingleMic
