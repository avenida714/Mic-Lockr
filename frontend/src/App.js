// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

//components
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Mics from "./components/Mics";
import LookAtSingleMic from "./components/LookAtSingleMic";
import AddMic from "./components/AddMic";
import UpdateMic from "./components/UpdateMic";
import FlexPage from "./components/FlexPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap' ;




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const personLoggedIn = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            {personLoggedIn ? <Mics /> : <FlexPage />}
          </Route>
          <Route exact path='/mics/create'>
            {personLoggedIn ? <AddMic /> : <SignupFormPage />}
          </Route>
          <Route exact path='/mics/:micId/edit'>
            <UpdateMic />
          </Route>
          <Route exact path='/mics/:micId'>
            <LookAtSingleMic />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;

/**heroku restart && heroku pg:reset DATABASE --confirm mic-lockr && heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all */
