import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import {
  Table,
} from 'react-bootstrap';

import style from './styleMakeRate'

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
      rate: {
        mainBet: {
          partyOne,
          partyTwo,
          partyDraw,
          idPartyVictory,
        },
        party,
      },
      handleModal,
      classes,
      isDisabled,
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
            <th>П1 | К- {partyOne.coefficient < 1 ? '' : partyOne.coefficient}</th>
            {
              partyDraw.idParty &&
              <th>Х | К- {partyDraw.coefficient < 1 ? '' : partyDraw.coefficient}</th>
            }
            <th>П2 | К- {partyTwo.coefficient < 1 ? '' : partyTwo.coefficient}</th>
            <th>Уч.</th>
          </tr>
        </thead>
        <tbody>
          <tr
          >
            <td>
              <button
                disabled={isDisabled}
                onClick={handleModal}
                data-partynumber='partyOne'
                className={classnames(
                  classes['make-btn'],
                  {
                    [classes['make-win']]: idPartyVictory === Number(partyOne.idParty)
                  }
                )}
                title={idPartyVictory === Number(partyOne.idParty) ? 'Эта ставка выиграла' : ''}
              >
                {partyOne.terms}
              </button>
            </td>
            {
              partyDraw.idParty &&
              <td>
                <button
                  disabled={isDisabled}
                  onClick={handleModal}
                  data-partynumber='partyDraw'
                  className={classnames(
                    classes['make-btn'],
                    {
                      [classes['make-win']]: idPartyVictory === Number(partyDraw.idParty)
                    }
                  )}
                  title={idPartyVictory === Number(partyDraw.idParty) ? 'Эта ставка выиграла' : ''}
                >
                  {partyDraw.terms}
                </button>
              </td>
            }
            <td>
              <button
                disabled={isDisabled}
                onClick={handleModal}
                data-partynumber='partyTwo'
                className={classnames(
                  classes['make-btn'],
                  {
                    [classes['make-win']]: idPartyVictory === Number(partyTwo.idParty)
                  }
                )}
                title={idPartyVictory === Number(partyTwo.idParty) ? 'Эта ставка выиграла' : ''}
              >
                {partyTwo.terms}
              </button>
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
  rate: PropTypes.shape(),
  isDisabled: PropTypes.bool,
  classes: PropTypes.shape(),
  handleModal: PropTypes.func,
}

export default injectSheet(style)(MakeRateTabel);
