//components/mics

import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchMicsThunk } from "../../store/mics";
// import { useState } from "react";
import { useHistory } from "react-router-dom";

import './mics.css'
import Slider from "../Slider/Slider";

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
    <div className="parentLockrDiv">
      <h1 className="headline">Welcome To The Mic Lockr!</h1>
      <main id="main" data-aos="fade" data-aos-delay="1500">
      <section className="gallery" id="gallery">
        <div className="container-fluid">
        {/* <Slider micLockrMics={micLockrMics}/> */}
      {micLockrMics.map((micObj) => {
      return (
        <div key={micObj.id} className="row gy-4 justify-content-center">
        <div className="col-xl-3 col-lg-4 col-md-6" key={micObj.id}>
          <div className="gallery-item h-100">
          <img className="img-fluid" src={micObj.imageURL} key={micObj.id} alt={micObj.title} onClick={() => history.push(`/mics/${micObj.id}`)}></img>
          </div>
        </div>
        </div>
      )
    })}
    </div>
      </section>
      </main>
    <div>
      {createButton}
    </div>


  </div>
  )
}

  }


export default Mics
