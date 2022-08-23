//viewAndEditMic component

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { fetchMics } from "../../store/mics";


function LookAtSingleMic() {

  const micId = useParams().micId;
  const dispatch = useDispatch();
  const mics = useSelector(state => state.mics)
  const currentlyViewingThisMic = mics[micId]

  console.log(currentlyViewingThisMic)


useEffect(() => {
  dispatch(fetchMics())
}, [dispatch])





  return (
    <span>
      <img id="micImage" src={currentlyViewingThisMic?.imageURL} alt={currentlyViewingThisMic?.title}></img>
    </span>
  )
}

export default LookAtSingleMic
