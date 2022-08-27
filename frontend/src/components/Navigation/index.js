// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './micLockrLogo.jpeg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="navBar-div">
      <ul>
      <li>
        <NavLink exact to="/">
          <img src={logo} alt="logo" width="100px" height="100px" margin='8px' border-radius= '12px'></img>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>

  );
}

export default Navigation;
