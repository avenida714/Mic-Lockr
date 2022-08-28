// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import './loginFormStyling.css'


function LoginForm() {
  const dispatch = useDispatch();

  const history = useHistory()

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  //let's make the login

  const demoTapeLogin = () => {
    const credential = 'Demo-tape'
    const password = 'password'

    return dispatch(sessionActions.login({ credential, password}))
      .then(() => history.push('/'))
      .catch(
        async (res) => {
          const resData = await res.json();
          if (resData && resData.errors) setErrors(resData.errors)
        }
      );

  }

  return (
    <div className="loginFormOuter">
    <form onSubmit={handleSubmit} className="formPieces">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h2>Been Here Before? Log In to See the Lockr!</h2>
      <h3>(Or You May Enter As Our Demo User)</h3>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      <button onClick={() => demoTapeLogin()}>DemoUser</button>
    </form>
    </div>
  );
}

export default LoginForm;
