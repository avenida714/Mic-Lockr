//components/mics

import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchMics } from "../../store/mics";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";

function Mics() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMics())
  }, [dispatch])

  // const history = useHistory();

  const personLoggedIn = useSelector((state) => {
    return state.session.user;
  })



  // not advisable to manipulate data in a useSelector
  const mics = useSelector(state => state.mics)

  let micLockrMics



  if (mics) {
   micLockrMics = Object.values(mics)
  }


  console.log('these are the mics ------->', micLockrMics)

  // const micsArr = [...mics]



      //THIS DISPATCHES AND GETS THE MICS ARR


if (personLoggedIn) {
  return (
    <div>
    {micLockrMics.map((micObj) => {
      return (
        <div key={micObj.id}>
          <img src={micObj.imageURL} alt={micObj.title}></img>
          <div>The mics</div>
        </div>
      )
    })}
  </div>
  )
}

  }


export default Mics
