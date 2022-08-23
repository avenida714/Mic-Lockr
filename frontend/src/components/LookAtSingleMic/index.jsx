//viewAndEditMic component

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

function LookAtSingleMic() {

  const micId = useParams();
  const dispatch = useDispatch().micId;
  const mics = useSelector(state => state.mics)
  const currentlyViewedMic = mics[micId]






  return (
    <div>LookAtSingleMic</div>
  )
}

export default LookAtSingleMic
