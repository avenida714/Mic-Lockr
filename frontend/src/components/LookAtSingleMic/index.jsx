//viewAndEditMic component

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';

import { fetchMics } from "../../store/mics";


// let's make this rando change

function LookAtSingleMic() {

  const micId = useParams().micId;
  const dispatch = useDispatch();
  const mics = useSelector(state => state.mics)
  const currentlyViewingThisMic = mics[micId]

  const history = useHistory()

  console.log(currentlyViewingThisMic)


useEffect(() => {
  dispatch(fetchMics())
}, [dispatch])





  return (
    <>
      <span>
      <img id="micImage" src={currentlyViewingThisMic?.imageURL} alt={currentlyViewingThisMic?.title} onClick={() => history.goBack()}></img>
    </span>
    {/* <button onClick={() => history.goBack()}>Back</button> */}
    </>

  )
}

export default LookAtSingleMic
