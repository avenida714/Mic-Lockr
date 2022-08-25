import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function Comments() {

  const dispatch = useDispatch;

  const micId = useParams().micId;

  const allComments = useSelector(state => state.comments)

  const mics = useSelector(state => state.mics)

  const currentlyViewingThisMic = mics[micId]

  const personLoggedIn = useSelector(state => state.session.user)


    console.log('this is the mic ------> ',currentlyViewingThisMic)


     console.log('this is the user logged in ------>', personLoggedIn)

     console.log('these are all the comments------>', allComments)



  return (
    <div>Comments</div>
  )
}

export default Comments
