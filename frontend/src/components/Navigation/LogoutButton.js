import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    history.push("/")
    await dispatch(logout());

  };

  return <button onClick={onLogout }>Logout</button>;
};

export default LogoutButton;
