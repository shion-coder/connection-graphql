import React, { createContext, useReducer } from 'react';

import decode from 'jwt-decode';

import authReducer, { LOGIN, LOGOUT } from 'reducers/auth-reducer';

/* -------------------------------------------------------------------------- */

const initialState = {
  user: null,
};

const token = localStorage.getItem('token');

if (token) {
  const decoded = decode(token);

  decoded.exp * 1000 < Date.now() ? localStorage.removeItem('token') : (initialState.user = decoded);
}

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    localStorage.setItem('token', userData.token);

    dispatch({ type: LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('token');

    dispatch({ type: LOGOUT });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
};
