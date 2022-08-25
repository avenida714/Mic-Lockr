//components/Comments

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { fetchCommentsThunk } from '../../store/comments';

// import { fetchMicsThunk } from '../../store/mics';

function Comments() {

  const dispatch = useDispatch();
  const {micId} = useParams();

  const allCommentsInObj = useSelector(state => state.comments)
  let comments;
  if(allCommentsInObj) {
     comments = Object.values(allCommentsInObj)
  }

  const mics = useSelector(state => state.mics)
  const currentlyViewingThisMic = mics[micId]

  const personLoggedIn = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchCommentsThunk(currentlyViewingThisMic))

  }, [dispatch, currentlyViewingThisMic])

    // console.log('this is the mic ------> ',currentlyViewingThisMic)
    //  console.log('this is the user logged in ------>', personLoggedIn)
    //  console.log('these are all the comments in an OBJECT------>', allCommentsInObj)
    //  console.log('these are all the COMMENTS[0].body ------->', comments[0].body)

  //comments will only show if the user is logged in, and if there are any comments at all
   return personLoggedIn && allCommentsInObj && (
    <div>
      <div>
         {comments.map((commentObj) => {
          return <div>{commentObj.body}</div>
         })}
      </div>

    </div>
  )


}

export default Comments
