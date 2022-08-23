//components/mics

import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchMics } from "../../store/mics";

function Mics() {

  const dispatch = useDispatch();

  // const history = useHistory();

  const sessionUser = useSelector((state) => {
    return state.session.user;
  })


  const mics = useSelector(state => {
    if (state.mics) {
      Object.values(state.mics)
    }
  })

  // console.log('these are the mics ------->', mics)

  // const micsArr = [...mics]

  useEffect(() => {
    dispatch(fetchMics())
  }, [dispatch])

  if(sessionUser) {

    return (
      <div>
        {mics ? mics.map((micImage) => {
          return (
            <div key={micImage.id}>
              <img alt={micImage?.title} src={micImage?.imageURL}></img>
            </div>
          )
        }): null}
        {}
      </div>
    )
  }
  }

export default Mics
