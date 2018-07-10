import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Search, Card, Icon } from 'semantic-ui-react';
import moment from 'moment';

import ClientInfoModal from '../clients/ClientInfoModal';
import AddClientModal from '../clients/AddClientModal';

const resultRenderer = client => (
  <Card>
    <Card.Content className="card-content search-results">
      <Card.Header>
        {client.firstName} {client.lastName}
      </Card.Header>
      <Card.Meta>
        <Icon name="checked calendar" />
        {moment(client.start).format('MMM Do YYYY')}
      </Card.Meta>
      <Card.Description>
        {client.addressFrom.city} <Icon name="arrow alternate circle right outline" /> {client.addressTo.city}
      </Card.Description>
    </Card.Content>
  </Card>
);

class NavBarSearch extends Component {
  state = {
    openAddClientModal: false,
    openClientInfoModal: false,
    newClient: {},
    client: {},
  };

  componentWillMount() {
    this.resetComponent();
  }

  onEditClick = client => this.setState({ openAddClientModal: true, client });

  onEditClient = client => this.setState({ openAddClientModal: true, client });

  closeAddClientModal = () => this.setState({ openAddClientModal: false });

  closeClientInfoModal = () => this.setState({ openClientInfoModal: false });

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: ``, openClientInfoModal: true, client: result });

  handleSearchChange = (e, { value }) => {
    const { clients } = this.props;
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = ({ firstName, lastName, phone, email }) => re.test(`${firstName} ${lastName} ${phone} ${email}`);

      this.setState({
        isLoading: false,
        results: _.filter(clients, isMatch).slice(0, 8),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results, client, newClient, openAddClientModal, openClientInfoModal } = this.state;

    return (
      <div>
        <Search
          size="mini"
          loading={isLoading}
          placeholder="Client Search..."
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { loading: true })}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
          {...this.props}
        />
        <ClientInfoModal
          client={client}
          openModal={openClientInfoModal}
          closeModal={this.closeClientInfoModal}
          onSelectEdit={this.onEditClient}
        />
        <AddClientModal
          edit
          clientToEdit={client}
          newClient={newClient}
          openModal={openAddClientModal}
          closeModal={this.closeAddClientModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ clients }) => ({ clients });

export default connect(mapStateToProps)(NavBarSearch);
