import React, { Component } from 'react';
import { Button, Modal, Card, Icon, Divider, Header, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import { removeClient } from '../../actions/clientsActions';

class ClientInfoModal extends Component {
  state = { openConfirm: false };

  // onRemove = () => {
  //   const { client, closeModal, removeClient } = this.props;
  //   removeClient(client._id);
  //   closeModal();
  // };

  onEdit = () => {
    const { client, closeModal, onSelectEdit } = this.props;
    onSelectEdit(client, true);
    closeModal();
  };

  showConfirm = () => this.setState({ openConfirm: true });

  cancelRemove = () => this.setState({ openConfirm: false });

  confirmedRemove = () => {
    const { client, closeModal, removeClient } = this.props;
    removeClient(client._id);
    this.setState({ openConfirm: false });
    closeModal();
  };

  render() {
    const { openModal, closeModal, client } = this.props;
    return (
      <div>
        <Modal open={openModal} onClose={closeModal} closeIcon>
          <Modal.Content>
            <Modal.Description>
              {client.addressFrom && (
                <div>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>
                        {client.firstName} {client.lastName}
                      </Card.Header>
                      <Card.Meta>
                        <Icon name="checked calendar" />
                        {moment(client.start).format('dddd, MMM Do')}
                      </Card.Meta>
                      <Card.Meta>
                        <Icon name="time" />
                        {moment(client.start).format('h:mm a')}
                      </Card.Meta>
                      <br />
                      <Icon name="phone" />
                      {client.phone}
                      <br />
                      <Icon name="mail" />
                      <a href={`mailto:${client.email}`}>{client.email}</a>
                      <br />
                      <br />
                      {client.notes && (
                        <div>
                          <Icon name="info circle" />
                          {client.notes}
                        </div>
                      )}
                      {client.wholeDay && (
                        <div>
                          <Icon name="shipping" />
                          ALL DAY JOB!
                        </div>
                      )}
                      {client.jobLength > 1 && (
                        <div>
                          <Icon name="time" />
                          {`Job length: ${client.jobLength} days`}
                        </div>
                      )}
                      <Card.Description>
                        <Divider horizontal>
                          <Header color="blue">Pick Up</Header>
                        </Divider>
                        <Icon name="marker" />
                        <a
                          target="_blank"
                          href={`https://www.google.com/maps/search/?api=1&query=${client.addressFrom.street}%20${
                            client.addressFrom.city
                          }%20${client.addressFrom.state}%2C%20${client.addressFrom.zip}`}
                        >
                          {client.addressFrom.street}, {client.addressFrom.city}, {client.addressFrom.state},{' '}
                          {client.addressFrom.zip}
                        </a>
                        {client.addressFrom.notes && (
                          <div>
                            <Icon name="info circle" />
                            {client.addressFrom.notes}
                          </div>
                        )}
                        <Divider horizontal>
                          <Header color="blue">Delivery</Header>
                        </Divider>
                        <Icon name="marker" />
                        <a
                          target="_blank"
                          href={`https://www.google.com/maps/search/?api=1&query=${client.addressTo.street}%20${
                            client.addressTo.city
                          }%20${client.addressTo.state}%2C%20${client.addressTo.zip}`}
                        >
                          {client.addressTo.street}, {client.addressTo.city}, {client.addressTo.state},{' '}
                          {client.addressTo.zip}
                        </a>
                        {client.addressTo.notes && (
                          <div>
                            <Icon name="info circle" />
                            {client.addressTo.notes}
                          </div>
                        )}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button size="tiny" onClick={this.onEdit} color="green">
                        Edit
                      </Button>
                      <Button size="tiny" onClick={this.showConfirm} color="red">
                        Remove
                      </Button>
                    </Card.Content>
                  </Card>
                </div>
              )}
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Confirm
          open={this.state.openConfirm}
          size="tiny"
          content={`Are you sure you want to delete: ${client.firstName} ${client.lastName}`}
          onCancel={this.cancelRemove}
          onConfirm={this.confirmedRemove}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeClient: clientId => dispatch(removeClient(clientId)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(ClientInfoModal);
