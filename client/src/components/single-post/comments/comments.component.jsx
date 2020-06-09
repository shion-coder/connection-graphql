import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Transition, Card } from 'semantic-ui-react';

import DeleteButton from 'components/buttons/delete-button/delete-button.component';

/* -------------------------------------------------------------------------- */

const Comments = ({ user, post: { id, comments } }) => (
  <Transition.Group>
    {comments.map(comment => (
      <Card fluid key={comment.id}>
        <Card.Content>
          {user && user.username === comment.username && <DeleteButton postID={id} commentID={comment.id} />}

          <Card.Header>{comment.name}</Card.Header>
          <Card.Meta>{moment(comment.date).fromNow()}</Card.Meta>
          <Card.Description>{comment.body}</Card.Description>
        </Card.Content>
      </Card>
    ))}
  </Transition.Group>
);

/* -------------------------------------------------------------------------- */

Comments.propTypes = {
  user: PropTypes.object,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }),
};

export default Comments;
