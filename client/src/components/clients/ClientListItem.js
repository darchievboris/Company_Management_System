import React, { Component } from 'react';
import { Button, Icon, Image, Accordion, Card, List, Divider, Popup, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import clientImg from '../../images/client2.png';
import { removeClient, editClient } from '../../actions/clientsActions';

class ClientListItem extends Component {
  handleRemove = id => {
    this.props.removeClient(id);
    this.setState({ activeIndex: -1 });
  };

  render() {
    const { client, index, handleClick, activeIndex, onEditClick, onInfoClick } = this.props;
    return (
      <div>
        <Accordion.Title index={index} onClick={handleClick}>
          <Card>
            <Card.Content className="card-content">
              {client.notes && (
                <Popup
                  trigger={
                    <Label color="blue" floating>
                      Notes
                    </Label>
                  }
                  content={client.notes}
                  position="bottom left"
                />
              )}
              <Image floated="right" size="mini" src={clientImg} />
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
              <Card.Description>
                {client.addressFrom.city} <Icon name="arrow alternate circle right outline" /> {client.addressTo.city}
              </Card.Description>
            </Card.Content>
          </Card>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <Label basic pointing>
            <Button
              floated="right"
              size="mini"
              color="red"
              circular
              icon="trash"
              onClick={() => this.handleRemove(client.id)}
            />
            <Button
              floated="right"
              size="mini"
              color="blue"
              circular
              icon="configure"
              onClick={() => onEditClick(client)}
            />
            <Button
              floated="right"
              size="mini"
              color="green"
              circular
              icon="info"
              onClick={() => onInfoClick(client)}
            />
            <List>
              <List.Item icon="phone" content={client.phone} />
              <List.Item icon="mail" content={<a href={`mailto:${client.email}`}>{client.email}</a>} />
              <Divider horizontal>From</Divider>
              <List.Item
                icon="marker"
                content={
                  <a
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${client.addressFrom.street}%20${
                      client.addressFrom.city
                    }%20${client.addressFrom.state}%2C%20${client.addressFrom.zip}`}
                  >
                    {client.addressFrom.street}, {client.addressFrom.city}, {client.addressFrom.state},{' '}
                    {client.addressFrom.zip}
                  </a>
                }
              />
              {client.addressFrom.notes && (
                <List.Item>
                  <Popup
                    trigger={
                      <Label color="green" as="a" tag>
                        Pickup Notes
                      </Label>
                    }
                    content={client.addressFrom.notes}
                    position="bottom left"
                  />
                </List.Item>
              )}
              <Divider horizontal>To</Divider>
              <List.Item
                icon="marker"
                content={
                  <a
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${client.addressTo.street}%20${
                      client.addressTo.city
                    }%20${client.addressTo.state}%2C%20${client.addressTo.zip}`}
                  >
                    {client.addressTo.street}, {client.addressTo.city}, {client.addressTo.state}, {client.addressTo.zip}
                  </a>
                }
              />
              {client.addressTo.notes && (
                <List.Item>
                  <Popup
                    trigger={
                      <Label color="green" as="a" tag>
                        Drop off Notes
                      </Label>
                    }
                    content={client.addressTo.notes}
                    position="bottom left"
                  />
                </List.Item>
              )}
            </List>
          </Label>
        </Accordion.Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeClient: id => dispatch(removeClient(id)),
  editClient: client => dispatch(editClient(client)),
});

export default connect(undefined, mapDispatchToProps)(ClientListItem);
