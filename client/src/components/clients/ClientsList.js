import React, { Component } from 'react';
import { Accordion, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import ClientListItem from '../clients/ClientListItem';
import ClientInfoModal from './ClientInfoModal';
import AddClientModal from './AddClientModal';

class ClientsList extends Component {
  state = {
    activeIndex: -1,
    openAddClientModal: false,
    openClientInfoModal: false,
    newClient: {},
    client: {},
    activeChunk: 0,
  };

  onEditClick = client => this.setState({ openAddClientModal: true, client });
  onInfoClick = client => this.setState({ openClientInfoModal: true, client });
  onEditClient = client => this.setState({ openAddClientModal: true, client });
  closeAddClientModal = () => this.setState({ openAddClientModal: false });
  closeClientInfoModal = () => this.setState({ openClientInfoModal: false });

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handlePaginationChange = (e, { activePage }) => this.setState({ activeChunk: activePage - 1 });

  render() {
    const { activeIndex, activeChunk } = this.state;
    const { clients } = this.props;
    return (
      <div>
        <Accordion>
          {clients[activeChunk] &&
            clients[activeChunk].map((client, i) => (
              <ClientListItem
                key={client.id}
                client={client}
                handleClick={this.handleClick}
                index={i}
                activeIndex={activeIndex}
                onEditClick={this.onEditClick}
                onInfoClick={this.onInfoClick}
              />
            ))}
        </Accordion>
        <div className="pagination-styles">
          <Pagination
            size="mini"
            firstItem={null}
            lastItem={null}
            // prevItem={null}
            // nextItem={null}
            pointing
            secondary
            onPageChange={this.handlePaginationChange}
            defaultActivePage={1}
            totalPages={clients.length}
          />
        </div>
        <ClientInfoModal
          client={this.state.client}
          openModal={this.state.openClientInfoModal}
          closeModal={this.closeClientInfoModal}
          onSelectEdit={this.onEditClient}
        />
        <AddClientModal
          edit
          clientToEdit={this.state.client}
          newClient={this.state.newClient}
          openModal={this.state.openAddClientModal}
          closeModal={this.closeAddClientModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clients: _.chunk(state.clients, 6),
});

export default connect(mapStateToProps)(ClientsList);
