import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  // Container,
  // Row,
  // Col,
  // Card,
  // Button,
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

    let part = null;
    party.forEach((item) => {
      if (+item.id === +idParty) {
        part = item;
      }
    });
    return part;
  }

  render() {
    const {
      // classes,
      reasonsForBetting,
      party,
    } = this.props;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Участник</th>
            <th>Условие</th>
            <th>Коэффициент</th>
          </tr>
        </thead>
        <tbody>
          {
            reasonsForBetting && reasonsForBetting.map(({ title, coefficient, idRFB, idParty }, idx) => {
              const { participator } = this.getPart(idParty);
              return (
                <tr key={idRFB}>
                  <td>{idx}</td>
                  <td>{participator}</td>
                  <td>{title}</td>
                  <td>{coefficient}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    );
  }
}

MakeRateTabel.propType = {
  reasonsForBetting: PropTypes.arrayOf({}),
  party: PropTypes.arrayOf({}),
  // classes: PropTypes.shape({}),
}

export default injectSheet({...style})(MakeRateTabel);
