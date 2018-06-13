import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Search, Card, Image, Icon } from 'semantic-ui-react';
import moment from 'moment';

import clientImg from '../../images/client2.png';

class NavBarSearch extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: `${result.firstName} ${result.lastName}` });

  resultRenderer = client => (
    <Card>
      <Card.Content className="card-content search-results">
        <Image floated="right" size="mini" src={clientImg} />
        <Card.Header>
          {client.firstName} {client.lastName}
        </Card.Header>
        <Card.Meta>
          <Icon name="checked calendar" />
          {moment(client.start).format('dddd, MMM Do YYYY')}
        </Card.Meta>
        <Card.Meta>
          <Icon name="time" />
          {moment(client.start).format('h:mm a')}
        </Card.Meta>
        <Card.Description>
          {client.addressFrom.city} <Icon name="arrow circle outline right" /> {client.addressTo.city}
        </Card.Description>
      </Card.Content>
    </Card>
  );

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
    const { isLoading, value, results } = this.state;

    return (
      <Search
        size="mini"
        loading={isLoading}
        placeholder="Client Search..."
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        resultRenderer={this.resultRenderer}
        results={results}
        value={value}
        // {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ clients }) => ({ clients });

export default connect(mapStateToProps)(NavBarSearch);
