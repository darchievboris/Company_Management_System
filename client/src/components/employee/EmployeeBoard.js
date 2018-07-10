import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

const EmployeeBoard = () => (
  <Container>
    <Header> Coming Soon!</Header>
  </Container>
);

export default EmployeeBoard;
