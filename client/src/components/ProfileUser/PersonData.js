import React from 'react';
import PropTypes from 'prop-types';

import {
  ListGroup,
} from 'react-bootstrap';

class PersonData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      userProps
    } = this.props;
    return (
      <ListGroup>
        {
          userProps.map((itm) => (
            <ListGroup.Item key={itm.name}>{itm.name}</ListGroup.Item>
          ))
        }
      </ListGroup>
    );
  }
}

PersonData.propTypes = {
  userProps: PropTypes.arrayOf(PropTypes.shape()),
}
export default PersonData;
