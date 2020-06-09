import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FadeIn from 'react-fade-in';

import { LOADING_DELAY } from 'config/consts';

import { Container, Spinner, Bounce, Text } from './loading.styles';

/* -------------------------------------------------------------------------- */

const Loading = ({ text, color }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), LOADING_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    loading && (
      <FadeIn>
        <Container>
          <Spinner>
            <Bounce />
            <Bounce delay="-1s" />
          </Spinner>

          {text && <Text color={color}>{text}</Text>}
        </Container>
      </FadeIn>
    )
  );
};

/* -------------------------------------------------------------------------- */

Loading.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Loading;
