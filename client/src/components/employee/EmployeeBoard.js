import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table, Container } from 'semantic-ui-react';

class EmployeeBoard extends Component {
  renderBodyRow = ({ name, phone, rate, hours, earnings }, i) => ({
    key: i,
    cells: [name, phone, rate, hours, earnings],
  });

  render() {
    const headerRow = ['Name', 'Phone', 'Rate', 'Hours', 'Earnings'];
    return (
      <Container>
        <Table renderBodyRow={this.renderBodyRow} celled compact definition color="teal" inverted striped selectable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Rate</Table.HeaderCell>
              <Table.HeaderCell>hours</Table.HeaderCell>
              <Table.HeaderCell>Earnings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="4">
                <Button floated="right" icon labelPosition="left" primary size="small">
                  <Icon name="user" /> Add Worker
                </Button>
                <Button size="small">Approve</Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

export default EmployeeBoard;
