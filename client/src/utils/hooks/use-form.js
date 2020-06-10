import React, { useState } from 'react';

import { Form, Message } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const useForm = (initialState = {}, fields, callback, boolean) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = event => setValues({ ...values, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();

    callback();
  };

  const renderFields = () =>
    fields.map(field => (
      <Form.Input
        key={field.name}
        {...field}
        value={values[field.name]}
        onChange={onChange}
        error={boolean ? errors[field.name] : !!errors[field.name]}
      />
    ));

  const renderErrors = () => Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />;

  return {
    values,
    onSubmit,
    renderFields,
    renderErrors,
    setErrors,
  };
};

export default useForm;
