import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addClient } from '../../actions/clientsActions';
import AddClientModal from './AddClientModal';
import ClientInfoModal from './ClientInfoModal';
import Event from './Event';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class JobCalendar extends Component {
  state = {
    openAddClientModal: false,
    openClientInfoModal: false,
    newClient: {},
    selectedClient: {},
    edit: false,
  };

  onSelectDate = date => {
    const newClient = {
      start: date.start,
      end: date.start,
    };
    this.setState({ openAddClientModal: true, newClient, edit: false });
  };

  onSelectClient = selectedClient => {
    this.setState({ openClientInfoModal: true, selectedClient });
  };

  onEditClient = (selectedClient, edit) => {
    this.setState({ openAddClientModal: true, selectedClient, edit });
  };

  closeAddClientModal = () => this.setState({ openAddClientModal: false });

  closeClientInfoModal = () => this.setState({ openClientInfoModal: false });

  eventStyleGetter = event => {
    if (event.wholeDay) {
      const backgroundColor = '#ff8080';
      const style = {
        backgroundColor,
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block',
      };
      return {
        style,
      };
    }
    return {};
  };

  render() {
    return (
      <div id="my_calendar">
        <BigCalendar
          selectable
          views={['month']}
          events={this.props.clients}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          defaultView="month"
          popup
          defaultDate={new Date()}
          onSelectSlot={this.onSelectDate}
          onSelectEvent={this.onSelectClient}
          eventPropGetter={this.eventStyleGetter}
          components={{
            event: Event,
          }}
        />
        <AddClientModal
          edit={this.state.edit}
          clientToEdit={this.state.selectedClient}
          newClient={this.state.newClient}
          openModal={this.state.openAddClientModal}
          closeModal={this.closeAddClientModal}
        />
        <ClientInfoModal
          client={this.state.selectedClient}
          openModal={this.state.openClientInfoModal}
          closeModal={this.closeClientInfoModal}
          onSelectEdit={this.onEditClient}
        />
      </div>
    );
  }
}

JobCalendar.propTypes = {
  clients: PropTypes.array.isRequired,
};

const mapStateToProps = ({ clients }) => ({ clients });

const mapDispatchToProps = dispatch => ({
  addNewClient: client => dispatch(addClient(client)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobCalendar);
