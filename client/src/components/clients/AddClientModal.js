import React, { Component } from 'react';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import { Header, Modal, Input, Form, Button, TextArea, Message, Radio, Checkbox, Divider } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import { connect } from 'react-redux';
import momentLocalizer from 'react-widgets-moment';
import uniqId from 'uniqid';
import Phone from 'react-phone-number-input';

import states from '../../utils/states';
import { addClient, editClient } from '../../actions/clientsActions';

moment.locale('en');
momentLocalizer();

  const inlineStyle = {
    modal : {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };

class AddClientModal extends Component {
  state = {};

  componentWillMount = () => {
    this.resetState();
  };

  componentWillReceiveProps = ({ clientToEdit, newClient, edit }) => {
    if (!edit) {
      console.log('create');
      this.resetState();
      this.setState(({ client }) => ({
        client: {
          ...client,
          id: uniqId(),
          start: moment(newClient.start)
            .add(moment.duration(8, 'hours'))
            .toDate(),
          end: moment(newClient.start)
            .add(moment.duration(13, 'hours'))
            .toDate(),
        },
      }));
    } else {
      this.setState(({ client }) => ({
        client: {
          ...client,
          ...clientToEdit,
          phone: clientToEdit.phone,
          start: new Date(clientToEdit.start),
          end: new Date(clientToEdit.end),
        },
      }));
    }
  };

  onSubmit = () => {
    const { client } = this.state;
    const { updateClient, addClient, edit, closeModal } = this.props;
    const errorList = [];
    const firstName = client.firstName.trim();
    if (firstName) {
      this.setErrorState('firstName', false);
    } else {
      this.setErrorState('firstName', true);
      errorList.push('Client Name cannot be empty!');
    }
    if (client.addressFrom.street) {
      this.setErrorState('fromStreet', false);
    } else {
      this.setErrorState('fromStreet', true);
      errorList.push('Pick up street address cannot be empty!');
    }
    if (client.start) {
      this.setErrorState('start', false);
    } else {
      this.setErrorState('start', true);
      errorList.push('Choose the move date.');
    }
    if (client.addressFrom.city) {
      this.setErrorState('fromCity', false);
    } else {
      this.setErrorState('fromCity', true);
      errorList.push('Pick up city name cannot be empty!');
    }
    if (client.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setErrorState('email', false);
    } else {
      this.setErrorState('email', true);
      errorList.push('Wrong email format!');
    }
    if (!client.phone || client.phone.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)) {
      this.setErrorState('phone', false);
    } else {
      this.setErrorState('phone', true);
      errorList.push('Wrong phone number!');
    }

    if (errorList.length === 0) {
      const finalClientInfo = client;
      if (finalClientInfo.jobLength < 2) {
        finalClientInfo.end = finalClientInfo.start;
      } else {
        finalClientInfo.end = moment(finalClientInfo.start)
          .add(finalClientInfo.jobLength - 1, 'days')
          .toDate();
      }
      finalClientInfo.title = `${client.firstName}: \n ${client.addressFrom.state} -> ${client.addressTo.state} `;
      if (edit) {
        updateClient(client);
      } else {
        addClient(client);
      }

      this.resetState();
      closeModal();
    } else {
      this.setErrorState('errorList', errorList);
    }
  };

  setMovingFromState = (property, value) => {
    this.setState(({ client }) => ({
      client: {
        ...client,
        addressFrom: {
          ...client.addressFrom,
          [property]: value,
        },
      },
    }));
  };

  setMovingToState = (property, value) => {
    this.setState(({ client }) => ({
      client: {
        ...client,
        addressTo: {
          ...client.addressTo,
          [property]: value,
        },
      },
    }));
  };

  setNewStateProp = (property, value) => {
    this.setState(({ client }) => ({
      client: {
        ...client,
        [property]: value,
      },
    }));
  };

  setErrorState = (prop, value) => {
    this.setState(({ error }) => ({
      error: {
        ...error,
        [prop]: value,
      },
    }));
  };

  setWholeDayChecker = () => {
    this.setState(({ client }) => ({
      client: {
        ...client,
        wholeDay: !client.wholeDay,
      },
    }));
  };

  jobLengthSwitch = (e, { value }) => {
    this.setState(prevState => ({
      ...prevState,
      client: {
        ...prevState.client,
        end: prevState.client.start,
        sameDay: value,
      },
    }));
  };

  jobLengthChange = (e, { value }) => {
    this.setState(prevState => ({
      ...prevState,
      client: {
        ...prevState.client,
        // end: moment(prevState.client.start)
        //   .add(value - 1, 'days')
        //   .toDate(),
        jobLength: value,
      },
    }));
  };

  resetState = () => {
    this.setState(() => ({
      client: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        notes: '',
        start: new Date(),
        end: new Date(),
        jobLength: 1,
        sameDay: 'same',
        wholeDay: false,
        addressFrom: {
          street: '',
          city: '',
          state: '',
          zip: '',
          notes: '',
        },
        addressTo: {
          street: '',
          city: '',
          state: '',
          zip: '',
          notes: '',
        },
      },
      error: {
        firstName: false,
        phone: false,
        email: false,
        fromStreet: false,
        fromCity: false,
        errorList: [],
      },
    }));
  };

  render() {
    const { openModal, closeModal } = this.props;
    const { client, error } = this.state;
    return (
      <Modal open={openModal} onClose={closeModal} closeIcon 
      // style={inlineStyle.modal}
      >
        <Modal.Content image>
          <Modal.Description>
            <Form error onSubmit={this.onSubmit}>
              {/* ******************************** Client info ************************************ */}
              <Divider horizontal>
                <Header color="blue">Client Info</Header>
              </Divider>
              {error.errorList.length > 0 && <Message error header="Failed to submit!" list={error.errorList} />}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>First name</label>
                  <Input
                    error={error.firstName}
                    label={{ icon: 'asterisk' }}
                    labelPosition="right corner"
                    value={client.firstName}
                    onChange={(e, { value }) => this.setNewStateProp('firstName', value)}
                    placeholder="First name"
                  />
                </Form.Field>
                <Form.Field
                  value={client.lastName}
                  onChange={(e, { value }) => this.setNewStateProp('lastName', value)}
                  control={Input}
                  label="Last name"
                  placeholder="Last name"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  error={error.email}
                  value={client.email}
                  onChange={(e, { value }) => this.setNewStateProp('email', value)}
                  control={Input}
                  label="Email"
                  placeholder="Email"
                />
                <Form.Field
                  error={error.phone}
                  value={client.phone}
                  country="US"
                  onChange={phone => this.setNewStateProp('phone', phone)}
                  control={Phone}
                  label="Phone Number"
                  placeholder="Enter phone number"
                />
              </Form.Group>

              {/* ******************************** Pick Up ************************************ */}
              <Divider horizontal>
                <Header color="blue">Pick Up</Header>
              </Divider>
              <Form.Group>
                <Form.Field width={10}>
                  <label>Street</label>
                  <Input
                    error={error.fromStreet}
                    value={client.addressFrom.street}
                    onChange={(e, { value }) => this.setMovingFromState('street', value)}
                    label={{ icon: 'asterisk' }}
                    labelPosition="right corner"
                    placeholder="Street Name"
                  />
                </Form.Field>
                <Form.Field width={6}>
                  <label>City</label>
                  <Input
                    error={error.fromCity}
                    value={client.addressFrom.city}
                    onChange={(e, { value }) => this.setMovingFromState('city', value)}
                    label={{ icon: 'asterisk' }}
                    labelPosition="right corner"
                    placeholder="City"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Select
                  fluid
                  value={client.addressFrom.state}
                  onChange={(e, { value }) => this.setMovingFromState('state', value)}
                  label="State"
                  options={states}
                  placeholder="State"
                  width={2}
                />
                <Form.Field
                  value={client.addressFrom.zip}
                  onChange={(e, { value }) => this.setMovingFromState('zip', value)}
                  control={Input}
                  label="Zip Code"
                  placeholder="Zip Code"
                  width={3}
                />
                <Form.Field width={8} error={error.start}>
                  <label>Move Date</label>
                  <DateTimePicker
                    onChange={date => this.setNewStateProp('start', date)}
                    value={client.start}
                    placeholder="Date/Time"
                  />
                </Form.Field>
                <Form.Field width={3}>
                  <label>Job Length</label>
                  <Radio
                    name="radioGroup"
                    label="Same Day"
                    value="same"
                    checked={client.sameDay === 'same'}
                    onChange={this.jobLengthSwitch}
                  />
                  <Radio
                    name="radioGroup"
                    label="Few Days"
                    value="not"
                    checked={client.sameDay === 'not'}
                    onChange={this.jobLengthSwitch}
                  />
                </Form.Field>
                {client.sameDay === 'not' && (
                  <Form.Field
                    width={2}
                    control={Input}
                    type="number"
                    label="Days"
                    value={client.jobLength}
                    onChange={this.jobLengthChange}
                  />
                )}
              </Form.Group>
              <Form.Field>
                <Checkbox toggle label="Whole Day Job." checked={client.wholeDay} onChange={this.setWholeDayChecker} />
              </Form.Field>
              <Form.Field
                value={client.addressFrom.notes}
                onChange={(e, { value }) => this.setMovingFromState('notes', value)}
                label="Notes"
                control={TextArea}
                rows="2"
              />

              {/* ******************************** Delivery ************************************ */}
              <Divider inverted horizontal>
                <Header color="blue">Delivery</Header>
              </Divider>
              <Form.Group>
                <Form.Field
                  value={client.addressTo.street}
                  onChange={(e, { value }) => this.setMovingToState('street', value)}
                  control={Input}
                  label="Street Name"
                  placeholder="Street Name"
                  width={10}
                />
                <Form.Field
                  value={client.addressTo.city}
                  onChange={(e, { value }) => this.setMovingToState('city', value)}
                  control={Input}
                  label="City"
                  placeholder="City"
                  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Select
                  fluid
                  value={client.addressTo.state}
                  onChange={(e, { value }) => this.setMovingToState('state', value)}
                  label="State"
                  options={states}
                  placeholder="State"
                  width={2}
                />
                <Form.Field
                  value={client.addressTo.zip}
                  onChange={(e, { value }) => this.setMovingToState('zip', value)}
                  control={Input}
                  label="Zip Code"
                  placeholder="Zip Code"
                  width={3}
                />
              </Form.Group>
              <Form.Field
                value={client.addressTo.notes}
                onChange={(e, { value }) => this.setMovingToState('notes', value)}
                label="Notes"
                control={TextArea}
                rows="2"
              />

              {/* ******************************** Delivery ************************************ */}
              <Divider horizontal>
                <Header color="blue">Additional Info</Header>
              </Divider>
              <Form.Field
                value={client.notes}
                onChange={(e, { value }) => this.setNewStateProp('notes', value)}
                control={TextArea}
                rows="3"
              />
              <Button primary type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

AddClientModal.propTypes = {};

const mapDispatchToProps = dispatch => ({
  addClient: client => dispatch(addClient(client)),
  updateClient: client => dispatch(editClient(client)),
});

export default connect(undefined, mapDispatchToProps)(AddClientModal);
