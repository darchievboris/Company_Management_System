import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBarSearch from './NavBarSearch';

class NavBarBtn extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Menu.Item href="/auth/google">Login With Google</Menu.Item>;
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
        <Menu.Item>{auth ? `Hello,  ${auth.name}` : ''}</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Menu position="right">
            <div className="ui right aligned category search item search-field">
              <div className="ui transparent icon ">
                <NavBarSearch />
              </div>
              <div className="results" />
            </div>
          </Menu.Menu>
          {this.renderContent()}
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(NavBarBtn);
