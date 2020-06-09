import React from 'react';

import { Grid } from 'semantic-ui-react';

import Loading from 'components/loading/loading.component';

/* -------------------------------------------------------------------------- */

const ShowLoading = () => (
  <Grid.Row centered>
    <Loading />
  </Grid.Row>
);

export default ShowLoading;
