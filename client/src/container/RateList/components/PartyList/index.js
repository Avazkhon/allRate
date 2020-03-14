import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import style from './style';

class PartyList extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }


  render() {
    const {
      party,
      classes,
    } = this.props;
    return (
      <ListGroup className="list-group-flush">
        {
          party.map((itm) => {
            return (
              <ListGroupItem key={itm._id} variant="dark">{itm.participator}</ListGroupItem>
            )
          })
        }
      </ListGroup>
    );
  }
}

PartyList.propType = {
  party: PropTypes.shape({}),
  classes: PropTypes.shape({
    _id: PropTypes.string,
    participator: PropTypes.string,
  })
}

export default injectSheet(style)(PartyList);
