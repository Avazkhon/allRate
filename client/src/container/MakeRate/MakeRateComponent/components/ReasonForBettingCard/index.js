import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
} from 'react-bootstrap';

const ReasonForBettingCard = ({
  participant,
  reasonForBetting,
}) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={participant.url} />
    <Card.Body>
      <Card.Title>{reasonForBetting.title}</Card.Title>
      <Card.Title>{`Участник: ${participant.participator}`}</Card.Title>
      <Card.Title>{`Описаание: ${participant.description}`}</Card.Title>
      <Card.Text>{`Коэффициент ${reasonForBetting.coefficient}`}</Card.Text>
      <Card.Text>Актуален: {reasonForBetting.relevant ? ' да' : ' нет' }</Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
)

ReasonForBettingCard.propType = {
  reasonForBetting: PropTypes.shape({}),
  participant: PropTypes.shape({}),
}

export default ReasonForBettingCard;
