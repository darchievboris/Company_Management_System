import React from 'react';
import { Button, Form, Container } from 'semantic-ui-react';

const NewEmployeeForm = () => (
  <Container>
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder="name" />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input placeholder="email" />
      </Form.Field>
      <Form.Field>
        <label>Phone</label>
        <input placeholder="phone" />
      </Form.Field>
      <Form.Field>
        <label>Rate</label>
        <input placeholder="rate" />
      </Form.Field>
      <Button type="submit">Add Employee</Button>
    </Form>
  </Container>
);

export default NewEmployeeForm;
