import React, { Component } from 'react';
import { Button, Form, Container, Dropdown, Input, Label, Card, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addEmployee } from '../../actions/employeeActions';
import positions from '../../utils/positionsList';

class NewEmployeeForm extends Component {
  state = {};

  onSubmit = () => {
    const { addEmployee, history } = this.props;
    addEmployee(this.state);
    history.push('/employee');
  };

  handleInput = (property, value) => {
    this.setState({ [property]: value });
  };

  render() {
    const { name, email, phone, rate, position } = this.state;
    return (
      <Container>
        <Segment color="teal">
          <Form onSubmit={this.onSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                label="Name"
                value={name}
                onChange={(e, { value }) => this.handleInput('name', value)}
                placeholder="name"
              />
              <Form.Input
                label="Email"
                value={email}
                onChange={(e, { value }) => this.handleInput('email', value)}
                placeholder="email"
              />
              <Form.Input
                label="Phone"
                value={phone}
                onChange={(e, { value }) => this.handleInput('phone', value)}
                placeholder="phone"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Rate</label>
                <Input
                  labelPosition="right"
                  type="number"
                  onChange={(e, { value }) => this.handleInput('rate', value)}
                  placeholder="Amount"
                >
                  <Label basic>$</Label>
                  <input />
                  <Label>.00</Label>
                </Input>
              </Form.Field>
              <Form.Dropdown
                onChange={(e, { value }) => this.handleInput('position', value)}
                value={position}
                label="Position"
                placeholder="position"
                selection
                options={positions}
              />
            </Form.Group>
            <Button basic color="teal" type="submit">
              Add Employee
            </Button>
            <Button basic color="red" as={Link} to="/employee">
              Cancel
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addEmployee: employee => dispatch(addEmployee(employee)),
  // updateClient: client => dispatch(editClient(client)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(NewEmployeeForm);
