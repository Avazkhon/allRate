import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col
} from 'react-bootstrap';

import Messages from 'components/Messages';

const ReasonForBettingCard = ({
  participant,
  reasonForBetting,
  submitRFB,
  summMany,
  handleChangeMany,
  purse: {
    purse: {
      amount
    },
    error: errorPurse,
    isFetching: isFetchingPurse,
  },
  isFetching,
  warning,
  error,
}) => (
  <Card>
    <Row className="justify-content-md-center">
      <Col xs="12" md="9">
        <Card.Img
          variant="top"
          src={reasonForBetting.img}
          style={{ width: '14rem' }}
        />
      </Col>
    </Row>
    <Card.Body>
      <Card.Title>{`Условия: ${reasonForBetting.terms}`}</Card.Title>
      <Card.Title>{`Участник: ${participant.participator}`}</Card.Title>
      {
        participant.description &&
        <Card.Title>{`Описание: ${participant.description}`}</Card.Title>
      }
      <Card.Text>{`Коэффициент: ${reasonForBetting.coefficient}`}</Card.Text>
      <Card.Text>
        {
          `Количество участников: ${
            reasonForBetting.participants
            && reasonForBetting.participants.length
          }`
        }
      </Card.Text>
      <Card.Text>Текущий счет: {amount}</Card.Text>
      <InputGroup>
        <FormControl
          value={summMany}
          onChange={handleChangeMany}
          placeholder="Введите сумму"
          aria-label="Amount (to the nearest dollar)"
        />
        <InputGroup.Prepend>
          <InputGroup.Text>руб.</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
      <Button
        variant="primary"
        onClick={submitRFB}
      >
        сделать ставку
      </Button>
    </Card.Body>

    <Card.Footer>
      <Messages
        warning={warning}
        error={error || errorPurse}
        isFetching={isFetching || isFetchingPurse}
      />
    </Card.Footer>
  </Card>
)

ReasonForBettingCard.propTypes = {
  reasonForBetting: PropTypes.shape({
    img: PropTypes.string,
    terms: PropTypes.string,
    coefficient: PropTypes.number,
    participants: PropTypes.arrayOf()
  }),
  participant: PropTypes.shape(PropTypes.string),
  purse: PropTypes.shape({
    purse: PropTypes.shape({
      amount: PropTypes.number,
    }),
    isFetching: PropTypes.bool,
    error: PropTypes.shape()
  }),
  submitRFB: PropTypes.func,
  handleChangeMany: PropTypes.func,
  summMany: PropTypes.number,
  warning: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
};

export default ReasonForBettingCard;
