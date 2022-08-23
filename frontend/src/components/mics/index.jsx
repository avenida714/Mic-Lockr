//components/mics

import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchMics } from "../../store/mics";
// import { useState } from "react";
import { useHistory } from "react-router-dom";

import './mics.css'

function Mics() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMics())
  }, [dispatch])

  const history = useHistory();

  const personLoggedIn = useSelector((state) => {
    return state.session.user;
  })



  // not advisable to manipulate data in a useSelector
  const mics = useSelector(state => state.mics)

  let micLockrMics



  if (mics) {
   micLockrMics = Object.values(mics)
  }


  // console.log('these are the mics ------->', micLockrMics)

  // const micsArr = [...mics]



      //THIS DISPATCHES AND GETS THE MICS ARR


if (personLoggedIn) {
  return (
    <>
      <span>
      {micLockrMics.map((micObj) => {
      return (
        <span className={"outerSpan"} key={micObj.id}>
        <span className={"img-holder"} key={micObj.id}>
          <img src={micObj.imageURL} key={micObj.id} alt={micObj.title} onClick={() => history.push(`/mics/${micObj.id}`)}></img>
        </span>
        </span>
      )
    })}
      </span>

  </>
  )
}

  }


export default Mics
