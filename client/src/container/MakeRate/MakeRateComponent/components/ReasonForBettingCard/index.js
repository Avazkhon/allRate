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

const ReasonForBettingCard = ({
  participant,
  reasonForBetting,
  submitRFB,
  summMany,
  handleChangeMany,
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
      <Card.Title>{`Условия: ${reasonForBetting.title}`}</Card.Title>
      <Card.Title>{`Участник: ${participant.participator}`}</Card.Title>
      {
        participant.description &&
        <Card.Title>{`Описание: ${participant.description}`}</Card.Title>
      }
      <Card.Text>{`Коэффициент: ${reasonForBetting.coefficient}`}</Card.Text>
      <Card.Text>
        {
          `Количество участников: ${
            reasonForBetting.bidForItem
            && reasonForBetting.bidForItem.length
          }`
        }
      </Card.Text>
      <Card.Text>Актуален: {reasonForBetting.relevant ? ' да' : ' нет' }</Card.Text>
      <InputGroup>
        <FormControl
          value={summMany}
          onChange={handleChangeMany}
          placeholder="Ввидите сумму"
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
  </Card>
)

ReasonForBettingCard.propType = {
  reasonForBetting: PropTypes.shape({}),
  participant: PropTypes.shape({}),
  submitRFB: PropTypes.func,
  handleChangeMany: PropTypes.func,
  summMany: PropTypes.number,
}

export default ReasonForBettingCard;
