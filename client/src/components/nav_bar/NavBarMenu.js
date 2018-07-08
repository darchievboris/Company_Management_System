import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import NavBarBtn from './NavBarBtn';

const NavBarMenu = ({ children, onPusherClick, onToggle, visible }) => (
  <div>
    <NavBarBtn onToggle={onToggle} />
    <Sidebar.Pushable>
      <Sidebar as={Menu} animation="push" icon="labeled" vertical inverted visible={visible} width='thin'>
        <Menu.Item name="Clients" as={Link} to="clients">
          <Icon name="calendar" />
          Clients
        </Menu.Item>
        <Menu.Item name="Employee" as={Link} to="employee">
          <Icon name="address card outline" />
          Employee
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher dimmed={visible} onClick={onPusherClick}>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

export default NavBarMenu;
