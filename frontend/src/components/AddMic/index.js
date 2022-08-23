import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createMic } from '../../store/mics'


function AddMic() {

  const personLoggedIn = useSelector((state) => state.session.user)

  const history = useHistory()

  const dispatch = useDispatch()

  //mics have title, description, imageURL
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [errors, setErrors] = useState([])



  //force the user to sign up if they access this page
  useEffect(() => {
    if (!personLoggedIn) {
      history.push('/signup')
    }
  }, [personLoggedIn, history])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMicForTheLockr = {
      userId: personLoggedIn.id,
      imageURL,
      title,
      description

    }
    await dispatch(createMic(newMicForTheLockr))
      .then((newMic) => history.push(`/mics/${newMic.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && errors) setErrors(data.errors)
      })
  }


  return (
    <div>AddMic</div>
  )
}

export default AddMic
