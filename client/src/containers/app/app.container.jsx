import React, { Suspense, lazy } from 'react';

import { Switch, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import AuthRoute from 'containers/auth-route/auth-route.container';
import Header from 'components/header/header.component';
import Loading from 'components/loading/loading.component';

/* -------------------------------------------------------------------------- */

// Lazy loading
const Home = lazy(() => import('pages/home/home.page'));
const SinglePost = lazy(() => import('pages/single-post/single-post.page'));
const Register = lazy(() => import('pages/register/register.page'));
const Login = lazy(() => import('pages/login/login.page'));

const App = () => (
  <Container>
    <Header />

    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:postID" component={SinglePost} />

        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute exact path="/login" component={Login} />
      </Switch>
    </Suspense>
  </Container>
);

export default App;
