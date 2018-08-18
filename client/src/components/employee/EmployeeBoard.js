import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as employeeActions from '../../actions/employeeActions';

class EmployeeBoard extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }

  renderRow = () => {
    const { employees } = this.props;
    return (
      <Table.Body>
        {employees.map(({ name, phone, rate, position, email, _id }) => (
          <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{phone}</Table.Cell>
            <Table.Cell>{rate}</Table.Cell>
            <Table.Cell>{position}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button as={Link} to={`employee/${_id}`} basic color="teal" animated="vertical">
                  <Button.Content hidden>info</Button.Content>
                  <Button.Content visible>
                    <Icon name="info" />
                  </Button.Content>
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  };

  renderHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Rate</Table.HeaderCell>
        <Table.HeaderCell>Position</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  renderFooter = () => (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="6">
          <Button
            as={Link}
            to="/employee/new"
            basic
            color="teal"
            floated="right"
            icon
            labelPosition="left"
            size="small"
          >
            <Icon name="user" /> Add Worker
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );

  render() {
    return (
      <Container>
        <Table singleLine compact color="teal" selectable>
          {this.renderHeader()}
          {this.renderRow()}
          {this.renderFooter()}
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ employees }) => ({ employees });

export default connect(
  mapStateToProps,
  employeeActions
)(EmployeeBoard);
