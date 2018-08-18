import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Redirect from 'react-router-dom/Redirect';
import EmployeeBoard from '../components/employee/EmployeeBoard';
import ClientBoard from '../components/clients/ClientsBoard';
import NotFoundPage from '../components/NotFoundPage';
import Landing from '../components/Landing';
import RequireAuth from '../utils/RequireAuth';

import NavBar from '../components/nav_bar/NavBar';
import NewEmployeeForm from '../components/employee/NewEmployeeForm';
import EmployeeInfo from '../components/employee/EmployeeInfo';

const AppRouter = ({ auth }) => (
  <div>
    <BrowserRouter>
      <div>
        <NavBar>
          <Switch>
            <Route exact path="/" render={() => (auth ? <Redirect to="/clients" /> : <Landing />)} />)} />
            <Route exact path="/clients" component={RequireAuth(ClientBoard)} />)} />
            <Route exact path="/employee" component={EmployeeBoard} />)} />
            <Route exact path="/employee/new" component={NewEmployeeForm} />)} />
            <Route exact path="/employee/:id" component={EmployeeInfo} />)} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </NavBar>
      </div>
    </BrowserRouter>
  </div>
);

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(AppRouter);
