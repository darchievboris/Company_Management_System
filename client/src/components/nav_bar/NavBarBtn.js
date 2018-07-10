import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import NavBarSearch from './NavBarSearch';

class NavBarBtn extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        return <Menu.Item href="/api/logout"> Logout</Menu.Item>;
    }
  }

  render() {
    const { onToggle, auth } = this.props;
    return (
      <Menu icon attached="top" inverted color="teal">
        <Menu.Menu>
          <Menu.Item onClick={onToggle} color="blue">
            <Icon name="sidebar" />
          </Menu.Item>
        </Menu.Menu>
        {auth && <Menu.Item>Hello, {auth.name}</Menu.Item>}
        {auth && (
          <Menu.Menu position="right">
            <Menu.Menu position="right">
              <div className="item search-field">
                <NavBarSearch />
              </div>
            </Menu.Menu>
            {this.renderContent()}
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(NavBarBtn);
