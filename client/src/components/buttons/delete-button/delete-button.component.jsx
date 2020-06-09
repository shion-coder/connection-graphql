import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST } from 'gql/posts/mutation';
import { DELETE_COMMENT } from 'gql/comment/mutation';
import { GET_POSTS } from 'gql/posts/query';

import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const DeleteButton = ({ postID, commentID, callback }) => {
  const mutation = commentID ? DELETE_COMMENT : DELETE_POST;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePostOrComment] = useMutation(mutation, {
    update: () => {
      setConfirmOpen(false);
      callback && callback();
    },
    variables: { postID, commentID },
    refetchQueries: () => !commentID && [{ query: GET_POSTS }],
  });

  const onClick = () => setConfirmOpen(true);
  const onCancel = () => setConfirmOpen(false);
  const onConfirm = () => deletePostOrComment();

  return (
    <>
      <Popup
        content={commentID ? 'Delete comment' : 'Delete post'}
        inverted
        trigger={
          <Button icon as="div" color="red" floated="right" onClick={onClick}>
            <Icon name="trash" />
          </Button>
        }
      />

      <Confirm
        content="Are you sure you want to delete this post?"
        open={confirmOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
};

/* -------------------------------------------------------------------------- */

DeleteButton.propTypes = {
  postID: PropTypes.string.isRequired,
  commentID: PropTypes.string,
  callback: PropTypes.func,
};

export default DeleteButton;
