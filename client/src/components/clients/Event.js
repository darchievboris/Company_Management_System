import React from 'react';

function Event({ event }) {
  return (
    <span>
      <span>{`${event.firstName} ${event.lastName}`}</span>
      {/* <br /> */}
      {/* <span>{moment(event.start).format('h:mm a')}</span> */}
      <br />
      <span>{`${event.addressFrom.state} -> ${event.addressTo.state}`}</span>
    </span>
  );
}

export default Event;
