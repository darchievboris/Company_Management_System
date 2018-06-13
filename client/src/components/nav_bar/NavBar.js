import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import NavBarMenu from './NavBarMenu';

export default class NavBar extends Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <NavBarMenu onPusherClick={this.handlePusher} onToggle={this.handleToggle} visible={visible}>
          <Container fluid style={{ marginTop: '2em' }}>
            {children}
          </Container>
        </NavBarMenu>
      </div>
    );
  }
}
