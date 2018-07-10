import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import Router from '../routers/Router';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
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

export default connect(
  null,
  actions
)(App);
