import React from 'react';
// import { Button, Input, Icon, Form, Grid } from 'semantic-ui-react';
import { Button, Header, Segment, Message, Icon, Form, Grid } from 'semantic-ui-react';

const Landing = () => (
  <div className="login-form">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />

            <Button color="teal" fluid size="large">
              Login
            </Button>
            <Button style={{ marginTop: '5px' }} size="large" fluid href="/auth/google" color="blue">
              <Icon name="google plus" /> Login With Google
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/auth/google">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
  // <Grid centered verticalAlign="middle" columns={3}>
  //   <Grid.Row>
  //     <Grid.Column>
  //       <Form>
  //         <Form.Field>
  //           <label>Login</label>
  //           <Input icon="user" iconPosition="left" placeholder="email" />
  //         </Form.Field>
  //         <Form.Field>
  //           <label>Password</label>
  //           <Input icon="lock" iconPosition="left" placeholder="password" />
  //         </Form.Field>
  //         <Button color="teal" type="submit">
  //           Login
  //         </Button>
  //         <Button href="/auth/google" color="google plus">
  //           <Icon name="google plus" /> Login With Google
  //         </Button>
  //       </Form>
  //     </Grid.Column>
  //   </Grid.Row>
  // </Grid>
);

export default Landing;
