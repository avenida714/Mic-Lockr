import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMics } from "../../store/mics";

function Mics() {

  const dispatch = useDispatch();


  const mics = useSelector(state => {
    if (state.mics) {
      Object.values(state.mics)
    }
  })

  useEffect(() => {
    dispatch(fetchMics())
  }, [dispatch])

  return (
    <div>
      Stretch Your Vocal Cords
    </div>
  )
}

export default Mics
