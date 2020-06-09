import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Button, Icon, Label, Popup } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const CommentButton = ({ post: { id, commentCount } }) => (
  <Popup
    content="Comment on post"
    inverted
    trigger={
      <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
        <Button color="blue" basic>
          <Icon name="comments" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    }
  />
);

/* -------------------------------------------------------------------------- */

CommentButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
};

export default CommentButton;
