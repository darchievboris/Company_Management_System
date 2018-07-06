import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import EmployeeBoard from '../components/employee/EmployeeBoard';
import ClientBoard from '../components/clients/ClientsBoard';
import NotFoundPage from '../components/NotFoundPage';
import Landing from '../components/Landing';
import RequireAuth from '../utils/RequireAuth';

import NavBar from '../components/nav_bar/NavBar';

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <div>
        <NavBar>
          <Switch>
            <Route exact path="/" component={Landing} />)} />
            <Route exact path="/clients" component={RequireAuth(ClientBoard)} />)} />
            <Route exact path="/employee" component={EmployeeBoard} />)} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </NavBar>
      </div>
    </BrowserRouter>
  </div>
);

export default AppRouter;
