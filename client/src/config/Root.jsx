import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from 'context/auth-context';

import GlobalStyle from 'utils/styles/global';

import App from 'containers/app/app.container';

/* -------------------------------------------------------------------------- */

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />

    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ApolloProvider>
);

export default Root;
