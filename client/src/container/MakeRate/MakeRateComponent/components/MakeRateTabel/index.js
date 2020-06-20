import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'react-bootstrap';

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
            <th>П1 | К- {partyOne.coefficient}</th>
            {
              partyDraw.idParty &&
              <th>Х | К- {partyDraw.coefficient}</th>
            }
            <th>П2 | К- {partyTwo.coefficient}</th>
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

MakeRateTabel.propTypes = {
  mainBet: PropTypes.arrayOf({}),
  party: PropTypes.arrayOf({}),
  handleModal: PropTypes.func,
}

export default MakeRateTabel;
