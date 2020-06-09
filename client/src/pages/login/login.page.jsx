import React, { useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from 'gql/users/mutation';

import { Form, Button, Header } from 'semantic-ui-react';

import { AuthContext } from 'context/auth-context';

import { LOGIN_FIELD } from 'config/fields';
import useForm from 'utils/hooks/use-form';

import { Container } from './login.styles';

/* -------------------------------------------------------------------------- */

const Login = ({ history }) => {
  const context = useContext(AuthContext);

  const callback = () => login();

  const { values, onSubmit, renderFields, renderErrors, setErrors } = useForm(
    { username: '', password: '' },
    LOGIN_FIELD,
    callback,
  );

  const [login, { loading }] = useMutation(LOGIN, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      history.push('/');
    },
    onError: err => setErrors(err.graphQLErrors[0].extensions.exception.errors),
    variables: values,
  });

  return (
    <Container>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Header as="h1" color="teal" style={{ textAlign: 'center', marginTop: 20, letterSpacing: 2 }}>
          Login
        </Header>

        {renderFields()}

        <Button type="submit" primary fluid>
          Login
        </Button>
      </Form>

      {renderErrors()}
    </Container>
  );
};

export default Login;
