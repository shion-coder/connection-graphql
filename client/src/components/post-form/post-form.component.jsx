import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from 'gql/posts/mutation';
import { GET_POSTS } from 'gql/posts/query';

import { Form, Button, TextArea } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const PostForm = () => {
  const [value, setValues] = useState('');

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update: () => setValues(''),
    variables: { body: value },
    refetchQueries: [{ query: GET_POSTS }],
  });

  const onChange = e => setValues(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    createPost();
  };

  return (
    <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
      <Form.Field>
        <TextArea onChange={onChange} value={value} style={{ minHeight: '96px' }} />
      </Form.Field>

      <Button type="submit" color="teal" size="small" disabled={value.trim() === ''}>
        Create Post
      </Button>
    </Form>
  );
};

export default PostForm;
