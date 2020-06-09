import React from 'react';

import { Grid, Image } from 'semantic-ui-react';

/* -------------------------------------------------------------------------- */

const Avatar = () => (
  <Grid.Column width={2}>
    <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
  </Grid.Column>
);

export default Avatar;
