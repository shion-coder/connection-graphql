import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import ShowPostForm from 'components/home/show-post-form/show-post-form.component';
import ShowPostCard from 'components/home/show-post-card/show-post-card.component';

/* -------------------------------------------------------------------------- */

const Posts = ({ user, posts }) => (
  <Grid.Row>
    {user && <ShowPostForm />}

    {posts && <ShowPostCard posts={posts} />}
  </Grid.Row>
);

/* -------------------------------------------------------------------------- */

Posts.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
};

export default Posts;
