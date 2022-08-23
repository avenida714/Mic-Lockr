// store/mics.js

import {csrfFetch} from './csrf'

const LOAD_MICS = 'mics/LOAD'

//regularr action creator to load mics
export const loadMics = (mics) => {
  return {type: LOAD_MICS,
  mics
}
}

//thunc action creator for fetching all the mics (this is the action)
export const fetchMics = () => async dispatch => {
  const response = await csrfFetch('/api/mics')
  if(response.ok) {
    const mics = await response.json();
    dispatch(loadMics(mics))
    console.log(mics)
    return mics;
  }
}

export const createMic = (mic) => async dispatch => {
  const res = await csrfFetch('/api/mics', {
    method: 'POST',
    body: JSON.stringify(mic)
  })

  if (res.ok) {

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

    default:
      return state;
  }
}


export default micReducer;
