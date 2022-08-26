//components/ADDCOMMENT

import React, { useState } from 'react'

function AddComment() {

  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
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
