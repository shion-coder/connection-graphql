import React, { useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from 'gql/users/mutation';

import { Form, Button, Header } from 'semantic-ui-react';

import { AuthContext } from 'context/auth-context';

import { REGISTER_FIELD } from 'config/fields';
import useForm from 'utils/hooks/use-form';

import { Container } from './register.styles';

/* -------------------------------------------------------------------------- */

const Register = ({ history }) => {
  const context = useContext(AuthContext);

  const callback = () => register();

  const { values, onSubmit, renderFields, renderErrors, setErrors } = useForm(
    { name: '', username: '', email: '', password: '', confirmPassword: '' },
    REGISTER_FIELD,
    callback,
  );

  const [register, { loading }] = useMutation(REGISTER, {
    update: (_, { data: { register: userData } }) => {
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
          Register
        </Header>

        {renderFields()}

        <Button type="submit" primary fluid>
          Register
        </Button>
      </Form>

      {renderErrors()}
    </Container>
  );
};

export default Register;
