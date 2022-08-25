//components/UpdateMic

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { fetchMicsThunk } from '../../store/mics';




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
  const [imageURL, setImageURL] = useState('')
  const [errors, setErrors] = useState([])


  const newMicData = {

  }

//dispatch()


/*





  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMicForTheLockr = {
      userId: personLoggedIn.id,
      imageURL,
      title,
      description

    }
    await dispatch(createMicThunk(newMicForTheLockr))
      .then((newMic) => history.push(`/mics/${newMic.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && errors) setErrors(data.errors)
      })
  }

*/








  return (
    <div>UpdateMic</div>
  )
}

export default UpdateMic
