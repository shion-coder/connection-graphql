import React from 'react';
import PropTypes from 'prop-types';

import { Transition, Grid } from 'semantic-ui-react';

import PostCard from 'components/post-card/post-card.component';

/* -------------------------------------------------------------------------- */

const ShowPostCard = ({ posts }) => (
  <Transition.Group>
    {posts.map(post => (
      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
        <PostCard post={post} />
      </Grid.Column>
    ))}
  </Transition.Group>
);

/* -------------------------------------------------------------------------- */

ShowPostCard.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default ShowPostCard;
