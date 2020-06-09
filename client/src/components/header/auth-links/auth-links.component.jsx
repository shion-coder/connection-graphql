import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const AuthLinks = ({ user, logout }) => (
  <Menu pointing secondary size="large" color="teal">
    <Menu.Item name={user?.name} active as={Link} to="/" />

    <Menu.Menu position="right">
      <Menu.Item name="logout" onClick={logout} />
    </Menu.Menu>
  </Menu>
);

/* -------------------------------------------------------------------------- */

AuthLinks.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default AuthLinks;
