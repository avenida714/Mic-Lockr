import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


function AddMic() {

  const personLoggedIn = useSelector((state) => state.session.user)

  const history = useHistory()

  const dispatch = useDispatch()

  //mics have title, description, imageURL
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [errors, setErrors] = useState([])




  return (
    <div>AddMic</div>
  )
}

export default AddMic
