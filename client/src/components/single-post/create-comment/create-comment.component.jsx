import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMMENT } from 'gql/comment/mutation';

import { Card, Form, Header } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const CreateComment = ({ post: { id } }) => {
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);
  const [createComment] = useMutation(CREATE_COMMENT, {
    update: () => {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: { postID: id, body: comment },
  });

  const onChange = e => setComment(e.target.value);

  return (
    <Card fluid>
      <Card.Content>
        <Header size="tiny">Post a comment</Header>

        <Form>
          <div className="ui action input fluid">
            <input
              type="text"
              placeholder="Comment.."
              name="comment"
              value={comment}
              onChange={onChange}
              ref={commentInputRef}
            />
            <button type="submit" className="ui button teal" disabled={comment.trim() === ''} onClick={createComment}>
              Submit
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */

CreateComment.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default CreateComment;
