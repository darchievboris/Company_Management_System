import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as clientActions  from '../../actions/clientsActions';
import JobCalendar from './JobCalendar';
import ClientList from './ClientsList';

class ClientBoard extends Component{
  componentDidMount(){
    this.props.getClients();
  }

  render(){
    return(
        <Grid stackable id="client_list">
          <Grid.Column width={3} className="client-list">
            <ClientList />
          </Grid.Column>
          <Grid.Column width={13}>
            <JobCalendar />
          </Grid.Column>
        </Grid>
      );
  } 
}

export default connect(undefined, clientActions)(ClientBoard);
