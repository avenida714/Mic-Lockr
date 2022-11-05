//components/AddMic

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createMicThunk } from '../../store/mics'

import './addMic.css'

function AddMic() {

  const personLoggedIn = useSelector((state) => state.session.user)

  const history = useHistory()

  const dispatch = useDispatch()

  //mics have title, description, imageURL
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState(null)
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
    console.log("THIS IS THE NEWMICFORTHELOCKR", newMicForTheLockr)

    await dispatch(createMicThunk(newMicForTheLockr))
      .then((newMic) => history.push(`/mics/${newMic.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && errors) setErrors(data.errors)
      })
  }

  const getMicImageFile = (e) => {
    const micFile = e.target.files[0]
    // console.log('THIS IS E.TARGET.FILES[0]', micFile)
    setImageURL(micFile)
  }

  return (
    <div className='addMicFormOuter'>
    <form className='formPieces'onSubmit={e => handleSubmit(e)}>
      <ul>
        {errors?.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      <label>Upload Your Mic Image! Include a jpeg, jpg, png, or gif</label>
      <input className="uploadMicImage"
        type="file"
        accept="image/*"
        onChange={getMicImageFile}
        required
      />
      <label>Title:</label>
      <input
        name="title"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What microphone is it...?"
      />
      <label>Description:</label>
      <input
        name="description"
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Tell us about this mic."
      />
      <button type="submit">Add Mic to the Lockr</button>
      <button onClick={() => (history.push('/'))}>Cancel</button>
    </form>

    </div>
  )
}
export default AddMic
