import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'semantic-ui-react';

import { AuthContext } from 'context/auth-context';

import Info from './info/info.component';
import LikeButton from '../buttons/like-button/like-button.component';
import CommentButton from '../buttons/comment-button/comment-button.component';
import DeleteButton from '../buttons/delete-button/delete-button.component';

/* -------------------------------------------------------------------------- */

const PostCard = ({ post: { id, name, username, body, date, likes, likeCount, commentCount } }) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Info post={{ id, name, username, date, body }} />

      <Card.Content extra>
        <LikeButton user={user} post={{ id, username, likes, likeCount }} />

        <CommentButton post={{ id, commentCount }} />

        {user && user.username === username && <DeleteButton postID={id} />}
      </Card.Content>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
};

export default PostCard;
