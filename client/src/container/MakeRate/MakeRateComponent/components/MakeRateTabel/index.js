import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Table,
} from 'react-bootstrap';

import style from './style';

class MakeRateTabel extends Component {
  constructor(props) {
    super(props);

  }

  getPart = (idParty) => {
    const { party } = this.props;
    if (!idParty || !party) return;
    if (idParty === 'all') {
      return { participator: 'общее' };
    };

    let part = null;
    party.forEach((item) => {
      if (item.id === idParty) {
        part = item;
      }
    });
    return part;
  }

  render() {
    const {
      // classes,
      mainBet: {
        partyOne,
        partyTwo,
        partyDraw,
      },
      party,
      handleModal,
    } = this.props;
    let countParticipants = party && (
      partyOne.participants.length +
      partyTwo.participants.length
    )
    if (partyDraw.participants.length) {
      countParticipants = countParticipants + partyDraw.participants.length
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>П1</th>
            {
              partyDraw.idParty &&
              <th>Х</th>
            }
            <th>П2</th>
            <th>Уч.</th>
          </tr>
        </thead>
        <tbody>
          <tr
          >
            <td
              onClick={handleModal}
              data-partynumber='partyOne'
              onClick={handleModal}
            >
              {partyOne.terms}
            </td>
            {
              partyDraw.idParty &&
              <td
                onClick={handleModal}
                data-partynumber='partyDraw'
                onClick={handleModal}
              >
                {partyDraw.terms}
              </td>
            }
            <td
              onClick={handleModal}
              data-partynumber='partyTwo'
              onClick={handleModal}
            >
              {partyTwo.terms}
            </td>
            <td>
              {countParticipants}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

MakeRateTabel.propType = {
  mainBet: PropTypes.arrayOf({}),
  party: PropTypes.arrayOf({}),
  handleModal: PropTypes.func,
  // classes: PropTypes.shape({}),
}

export default injectSheet({...style})(MakeRateTabel);
