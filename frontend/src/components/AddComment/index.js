//components/ADDCOMMENT

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { createCommentThunk } from '../../store/comments';

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
      userId: personLoggedIn.id,
      imageURL: currentlyViewingThisMic.imageURL,
      body: comment,

    }
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
      <label>Comment On This Mic!</label>
      <textarea
      type="textarea"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="What are your thoughts on this Microphone?"
      required
      />
      <button type="submit">Submit Comment</button>
    </form>
    </>
  )
}

export default AddComment
