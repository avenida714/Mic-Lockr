//components/ADDCOMMENT

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { createCommentThunk } from '../../store/comments';

import './AddComment.css'


function AddComment() {

  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState([])
  const micId = useParams().micId;

  const dispatch = useDispatch()



  const personLoggedIn = useSelector((state) => state.session.user)
  const mics = useSelector(state => state.mics)
  const currentlyViewingThisMic = mics[micId]

// console.log('this is the mic ------> ',currentlyViewingThisMic)


  const handleSubmit = async (e) => {
    e.preventDefault();

    //db expected userId, imageURL, body
    const newCommentForThisMic = {
      micId: currentlyViewingThisMic.id,
      userId: personLoggedIn.id,
      imageURL: currentlyViewingThisMic.imageURL,
      body: comment,

    }
    // console.log('this is the new comment for this mic ------>', newCommentForThisMic)
    await dispatch(createCommentThunk(newCommentForThisMic))
      .catch(async (res) => {
        const data = await res.json();
        if(data && errors) setErrors(data.errors)
      })
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <ul>
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      <div className='comment-container'>
         <label>Comment On This Mic!</label>
      <textarea className='comment-text-area'
      type="textarea"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="What are your thoughts on this Microphone?"
      required
      />
      <button className='submit-button' type="submit">Submit</button>
      </div>

    </form>
    </>
  )
}

export default AddComment
