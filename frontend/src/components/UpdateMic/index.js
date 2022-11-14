//components/UpdateMic

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { fetchMicsThunk } from '../../store/mics';

import { updateMicThunk } from '../../store/mics';

import './updateMic.css'

function UpdateMic() {

  const dispatch = useDispatch();

  const micId = useParams().micId

  const mics = useSelector(state => state.mics)

  const currentlyEditingThisMic = mics[micId]

  const personLoggedIn = useSelector((state) => state.session.user)

  const history = useHistory()

  // console.log('THIS IS MY MIC ID ----------->', micId)
  // console.log('THIS IS MY mics ----------->', mics)
  // console.log('CURRENTLY Editing THIS MIC ----------->', currentlyEditingThisMic)
  // console.log('this isthe person logged in----------->', personLoggedIn)


useEffect(() => {
  dispatch(fetchMicsThunk())
}, [dispatch])

//force the user to sign up if they access this page
  useEffect(() => {
    if (!personLoggedIn) {
      history.push('/signup')
    }
  }, [personLoggedIn, history])


const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [imageURL, setImageURL] = useState('')
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
          //be sure to send the micId so it can be found to be updated
     const newMicData = {
      micId:currentlyEditingThisMic.id,
    userId: personLoggedIn.id,
    // imageURL: imageURL,
    title: title,
    description: description
  }

   dispatch(updateMicThunk(newMicData))
      .then(() => history.push(`/mics/${currentlyEditingThisMic.id}`))
      .catch(async (res) => {
        const jsonSaidThis = await res.json()
          if(jsonSaidThis && errors) setErrors(jsonSaidThis.errors)
      })

  }



  return (
    <div className='editFormOuter'>
      <img clasName='editMicImg' src={currentlyEditingThisMic.imageURL} alt={currentlyEditingThisMic.title}></img>
    <form className='formPieces' onSubmit={e => handleSubmit(e)}>
      <ul>
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      {/* <label>Mic Image URL:</label> */}
      {/* <input
        name="imageURL"
        type="text"
        value={imageURL}
        onChange={e => setImageURL(e.target.value)}
        defaultValue={currentlyEditingThisMic.imageURL}
      /> */}
      <label>Title:</label>
      <input
        name="title"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={currentlyEditingThisMic.title}
      />
      <label>Description:</label>
      <input
        name="description"
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder={currentlyEditingThisMic.description}
      />
      <button type="submit">Update This Mic</button>
      <button onClick={() => (history.push('/'))}>Cancel</button>
    </form>

    </div>
  )
}

export default UpdateMic
