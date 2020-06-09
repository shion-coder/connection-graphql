import React, { useContext } from 'react';

import AuthLinks from './auth-links/auth-links.component';
import GuestLinks from './guest-links/guest-links.component';

import { AuthContext } from 'context/auth-context';

/* -------------------------------------------------------------------------- */

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? <AuthLinks user={user} logout={logout} /> : <GuestLinks />;
};

export default Header;
