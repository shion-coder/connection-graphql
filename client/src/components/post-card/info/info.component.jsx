import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import moment from 'moment';

import { Card, Image } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const Info = ({ post: { id, name, username, body, date } }) => {
  const time = moment(date).fromNow(true);

  return (
    <Card.Content>
      <Image
        floated="right"
        size="mini"
        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        as={Link}
        to={`/users/${username}`}
      />

      <Card.Header>{name}</Card.Header>

      <Card.Meta as={Link} to={`/posts/${id}`}>
        {time}
      </Card.Meta>

      <Card.Description>{body}</Card.Description>
    </Card.Content>
  );
};

/* -------------------------------------------------------------------------- */

Info.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default Info;
