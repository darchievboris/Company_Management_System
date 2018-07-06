import React from 'react'
import { Button, Input, Icon, Form, Grid } from 'semantic-ui-react'

const Landing = () => (
  <Grid centered verticalAlign='middle' columns={3}>
    <Grid.Row>
      <Grid.Column>
        <Form>
          <Form.Field>
            <label>Login</label>
            <Input icon='user' iconPosition='left' placeholder='email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input icon='lock' iconPosition='left' placeholder='password' />
          </Form.Field>
          <Button color='teal' type='submit'>Login</Button>
          <Button href="/auth/google" color='google plus'>
            <Icon name='google plus' /> Login With Google
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  </Grid>
 
)

export default Landing;