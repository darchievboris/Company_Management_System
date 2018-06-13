import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import Router from '../routers/Router';
import * as actions from '../actions';
import { getClients } from '../actions/clientsActions';

import clients from '../utils/events';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.store.dispatch(getClients(clients));
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default connect(null, actions)(App);
