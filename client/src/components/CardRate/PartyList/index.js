import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import style from './style';

const PartyList = ({ party }) => {
  return (
    <ListGroup className="list-group-flush">
      {
        party.map((itm) => {
          if (itm.id == 3) {
            return;
          }
          return (
            <ListGroupItem key={itm._id}>{itm.participator}</ListGroupItem>
          )
        })
      }
    </ListGroup>
  )
};

PartyList.propTypes = {
  party: PropTypes.shape(),
  classes: PropTypes.shape()
}

export default injectSheet(style)(PartyList);
