// store/mics.js

import {csrfFetch} from './csrf'

const LOAD_MICS = 'mics/LOAD'
const ADD_MIC = 'mics/ADD'  // bananable, disregard backend names
const DELETE_MIC = 'mics/DELETE'

const UPDATE_MIC = 'mics/UPDATE'

//regular ACTION CREATORS

//to load mics
const loadMics = (mics) => {
  return {type: LOAD_MICS,
  mics
}
}

//ac for add mic
const addMic = (mic) => {
  return {
    type: ADD_MIC,
    mic
  }
}

//ac to delete a mic
const deleteMic = (mic) => {
  return {
    type: DELETE_MIC,
    mic
  }
}

//ac to update a mic
const updateMic = (mic) => {
  return {
    type: UPDATE_MIC,
    mic
  }

}

//THUNK ACTION CREATORS
//thunc action creator for fetching all the mics (this is the action)
export const fetchMicsThunk = () => async dispatch => {
  const response = await csrfFetch('/api/mics')
  if(response.ok) {
    const mics = await response.json();
    dispatch(loadMics(mics))
    // console.log(mics)
    return mics;
  }
}

//thunk AC to create a mic
export const createMicThunk = (formData) => async dispatch => {
  // const {AWSUrl, description, userId, title} = mic
  const res = await csrfFetch('/api/mics/create', {
    method: 'POST',
    body: JSON.stringify(formData)
  })

  if (res.ok) {
    const mic = await res.json()
    dispatch(addMic(mic))
    return mic;
  }
}



//thunk AC to delete a mic
export const destroyMicThunk = (mic) => async dispatch => {
  const res = await csrfFetch('/api/mics/delete', {
    method: 'DELETE',
    body: JSON.stringify(mic)
  })
  const removedMic = await res.json();
  dispatch(deleteMic(removedMic))
  return removedMic
}


//THUNK AC FOR UPDATE
export const updateMicThunk = (mic) => async (dispatch) => {
  const response = await csrfFetch(`/api/mics/${mic.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mic)
  })

    if (response.ok) {
      const micToGetEdited = await response.json()
      dispatch(updateMic(micToGetEdited))
      return micToGetEdited
    }
}

//REDUCER

const micReducer = (state = {}, action) => {
  switch(action.type) {
    case LOAD_MICS:
      const micLockrObj = {};
      action.mics.forEach(mic => {
        micLockrObj[mic.id] = mic
      })
      return micLockrObj
    case ADD_MIC:
      return {...state, [action.mic.id]: action.mic}
    case UPDATE_MIC:
      const copiedState = {...state}
      copiedState[action.mic.id] = {...action.mic}
      return copiedState
    case DELETE_MIC:
      const dupedState = {...state}
      delete dupedState[action.mic]
      return dupedState
    default:
      return state;
  }
}


export default micReducer;
