import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Card } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const Info = ({ post: { name, body, date } }) => {
  const time = moment(date).fromNow();

  return (
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{time}</Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
  );
};

/* -------------------------------------------------------------------------- */

Info.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default Info;
