import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST } from 'gql/posts/mutation';

import { Button, Icon, Label, Popup } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    user && likes.find(like => like.username === user.username) ? setLiked(true) : setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    onError: () => {},
    variables: { postID: id },
  });

  const likeIcon = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Popup content={liked ? 'Unlike' : 'Like'} inverted trigger={likeIcon} />

      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

/* -------------------------------------------------------------------------- */

LikeButton.propTypes = {
  user: PropTypes.object,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    likeCount: PropTypes.number.isRequired,
  }),
};

export default LikeButton;
