//components/mics

import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchMicsThunk } from "../../store/mics";
// import { useState } from "react";
import { useHistory } from "react-router-dom";

import './mics.css'

function Mics() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMicsThunk())
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



  let createButton;

  if (personLoggedIn) {
    createButton = (<button onClick={() => history.push('/mics/create'
    )}>Add A Mic To the Lockr</button>)
  } else {
    createButton = null;
  }



if (personLoggedIn) {
  return (
    <>
      <h1>Check Out The Mic Lockr!</h1>
      <div className="outerDiv">
      {micLockrMics.map((micObj) => {
      return (
        <div key={micObj.id}>
        <div className="img-holder" key={micObj.id}>
          <img className="micImages" src={micObj.imageURL} key={micObj.id} alt={micObj.title} onClick={() => history.push(`/mics/${micObj.id}`)}></img>
        </div>
        </div>
      )
    })}
      </div>
      {createButton}


  </>
  )
}

  }


export default Mics
