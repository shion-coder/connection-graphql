import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/react-hooks';
import { GET_POST } from 'gql/posts/query';

import { Grid, Card } from 'semantic-ui-react';

import Loading from 'components/loading/loading.component';
import Avatar from 'components/single-post/avatar/avatar.component';
import Info from 'components/single-post/info/info.component';
import LikeButton from 'components/buttons/like-button/like-button.component';
import CommentButton from 'components/buttons/comment-button/comment-button.component';
import DeleteButton from 'components/buttons/delete-button/delete-button.component';
import CreateComment from 'components/single-post/create-comment/create-comment.component';
import Comments from 'components/single-post/comments/comments.component';

import { AuthContext } from 'context/auth-context';

/* -------------------------------------------------------------------------- */

const SinglePost = ({ match, history }) => {
  const { postID } = match.params;
  const { user } = useContext(AuthContext);

  const { loading, data: { getPost: post } = {} } = useQuery(GET_POST, {
    variables: { postID },
  });

  if (loading) {
    return <Loading />;
  }

  const { id, name, username, body, date, likes, comments, likeCount, commentCount } = post;

  const deleteCallback = () => history.push('/');

  return (
    <Grid>
      <Grid.Row>
        <Avatar />

        <Grid.Column width={10}>
          <Card fluid>
            <Info post={{ name, body, date }} />

            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />

              <CommentButton post={{ id, commentCount }} />

              {user && user.username === username && <DeleteButton postID={id} callback={deleteCallback} />}
            </Card.Content>
          </Card>

          {user && <CreateComment post={{ id }} />}

          {comments && <Comments user={user} post={{ id, comments }} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

/* -------------------------------------------------------------------------- */

SinglePost.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default SinglePost;
