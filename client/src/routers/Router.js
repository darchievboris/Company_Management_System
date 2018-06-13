import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeeBoard from '../components/employee/EmployeeBoard';
import ClientBoard from '../components/clients/ClientsBoard';
import NotFoundPage from '../components/NotFoundPage';

import NavBar from '../components/nav_bar/NavBar';

const Landing = () => <h2>Landing</h2>;

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <div>
        <NavBar>
          <Switch>
            <Route exact path="/" component={Landing} />)} />
            <Route exact path="/clients" component={ClientBoard} />)} />
            <Route exact path="/employee" component={EmployeeBoard} />)} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </NavBar>
      </div>
    </BrowserRouter>
  </div>
);

export default AppRouter;
