import React from 'react';
import { Grid } from 'semantic-ui-react';

import JobCalendar from './JobCalendar';
import ClientList from './ClientsList';

const ClientBoard = () => (
  <Grid stackable id="client_list">
    <Grid.Column width={3} className="client-list">
      <ClientList />
    </Grid.Column>
    <Grid.Column width={13}>
      <JobCalendar />
    </Grid.Column>
  </Grid>
);

export default ClientBoard;
