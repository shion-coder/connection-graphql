import React, { useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS } from 'gql/posts/query';

import { Grid, Header } from 'semantic-ui-react';

import ShowLoading from 'components/home/show-loading/show-loading.component';
import Posts from 'components/home/posts/posts.component';

import { AuthContext } from 'context/auth-context';

/* -------------------------------------------------------------------------- */

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(GET_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row centered style={{ marginTop: 10, letterSpacing: 2 }}>
        <Header as="h1" color="teal">
          Recent Posts
        </Header>
      </Grid.Row>

      {loading ? <ShowLoading /> : <Posts user={user} posts={posts} />}
    </Grid>
  );
};

export default Home;
