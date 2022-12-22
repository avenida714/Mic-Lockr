//components/Comments

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'

import { fetchCommentsThunk } from '../../store/comments';

import { destroyCommentThunk } from '../../store/comments';


// import { fetchMicsThunk } from '../../store/mics';

function Comments() {

  const dispatch = useDispatch();
  const {micId} = useParams();

  const history = useHistory()

  const allCommentsInObj = useSelector(state => state.comments)
  let comments;
  if(allCommentsInObj) {
     comments = Object.values(allCommentsInObj)

  }
  //write this is a way to make comments rerender?


  const chronologicalComments = [...comments].reverse();

  let mics = useSelector(state => state.mics)
  const currentlyViewingThisMic = mics[micId]

  const personLoggedIn = useSelector(state => state.session.user)

// console.log('this is the person logged in  --------->', personLoggedIn.username)

const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    dispatch(fetchCommentsThunk(currentlyViewingThisMic))

    setIsLoaded(true)



  }, [dispatch, currentlyViewingThisMic, isLoaded])



    // console.log('this is the mic ------> ',currentlyViewingThisMic)
    //  console.log('this is the user logged in ------>', personLoggedIn)
    //  console.log('these are all the comments in an OBJECT------>', allCommentsInObj)
    //  console.log('these are all the COMMENTS[0].body ------->', comments[0].body)






  //comments will only show if the user is logged in, and if there are any comments at all

  ////~~~~~~~~~~~~~Delete button logic -------------

  const deleteThisComment = async function (commentForDestruction) {
    const deleteCommentVariable = await dispatch(destroyCommentThunk(commentForDestruction))

    if(deleteCommentVariable) {
      history.push(`/mics/${micId}`)
    }

  }



  //~~~~~~~~~COMMENT TABLE LOGIC
  let commentTable;
  personLoggedIn && allCommentsInObj ? commentTable =  <div>
  <div>
     {chronologicalComments.map((commentObj, i) => {
      const thisIsMyComment = commentObj.userId === personLoggedIn.id
      let commentName;
      commentName = commentObj?.User?.username ? commentObj.User.username : personLoggedIn.username
      // console.log('this is the comment obj ----->', commentObj)
      return <div className='commentDiv' key={i}>
        {`${commentName} says: `}
        {commentObj.body}
        {thisIsMyComment ? <button onClick={
    () => deleteThisComment(commentObj)}>DELETE</button> : null}
      </div>

     })}
  </div>
</div> : commentTable = null






   return isLoaded && (
    <div className="commentBox" height="400px" width="400px">
    {commentTable}
    </div>
  )


}

export default Comments
