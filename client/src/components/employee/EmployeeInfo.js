import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import employeePic from '../../images/employee.png';

class EmployeeInfo extends Component {
  info = (email, phone) => (
    <div>
      email: {email}
      <br />
      phone: {phone}
    </div>
  );

  render() {
    const extra = (
      <a>
        <Icon name="user" />
        16 Friends
      </a>
    );

    const { name, position, email, phone } = this.props.employee;
    return (
      <Card image={employeePic} header={name} meta={position} description={this.info(email, phone)} extra={extra} />
    );
  }
}

const mapStateToProps = ({ employees }, ownProps) => ({
  employee: employees.find(emp => emp._id === ownProps.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  test: 'hello',
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInfo);
