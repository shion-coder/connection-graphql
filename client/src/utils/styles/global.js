import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import 'semantic-ui-css/semantic.min.css';

/* -------------------------------------------------------------------------- */

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
