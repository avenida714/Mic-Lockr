// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './micLockrLogo.jpeg'
import LogoutButton from './LogoutButton';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <LogoutButton user={sessionUser} />
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
    // <div className="navBar-div">
    //     <i className="annoyingAnchor" exact to="/"><img src={logo} height="60px" width="60px"alt="logo"/>
    //     </i>

    //     {isLoaded && sessionLinks}
    // </div>
    <>

    <div id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">

      <Link to="/" class="logo d-flex align-items-center  me-auto me-lg-0">

      {/* <img src="assets/img/logo.png" alt="">  */}
      <i className="annoyingAnchor" exact to="/"><img src={logo} height="60px" width="60px"alt="logo"/></i>

      </Link>



      <div class="header-social-links">
      {isLoaded && sessionLinks}
      </div>


     </div>
    </div>
    </>

  );
}

export default Navigation;
