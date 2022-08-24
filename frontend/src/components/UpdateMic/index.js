import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchMicsThunk } from '../../store/mics';


function UpdateMic() {

  const dispatch = useDispatch();

  const micId = useParams().micId

  const mics = useSelector(state => state.mics)

  const currentlyViewingThisMic = mics[micId]


useEffect(() => {
  dispatch(fetchMicsThunk())
}, [dispatch])



  return (
    <div>UpdateMic</div>
  )
}

export default UpdateMic
