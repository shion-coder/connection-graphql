import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from 'gql/posts/mutation';
import { GET_POSTS } from 'gql/posts/query';

import { Form, Header, Button } from 'semantic-ui-react';

import { POST_FIELD } from 'config/fields';
import useForm from 'utils/hooks/use-form';

/* -------------------------------------------------------------------------- */

const PostForm = () => {
  const callback = () => createPost();

  const { values, onSubmit, renderFields, setErrors } = useForm({ body: '' }, POST_FIELD, callback, true);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update: () => (values.body = ''),
    onError: err => setErrors(err.graphQLErrors[0].extensions.exception.errors),
    variables: values,
    refetchQueries: [{ query: GET_POSTS }],
  });

  return (
    <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
      <Header as="h4">Create a post:</Header>

      <Form.Field>{renderFields()}</Form.Field>

      <Button type="submit" color="teal">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
