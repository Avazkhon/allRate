import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Form,
  ListGroup,
  Button,
} from 'react-bootstrap';

const Party = ({
  party,
  handleChangeRate,
  handleDeleteDraw,
  HandleMakeVictory,
  isFinish,
  idPartyVictory,
  disabled,
}) => (
  <>
    <Row>
      <Col>
        <ListGroup>
          {party.map((itm) => {
            const id = itm.id|| itm._id;
            const isDraw = id === 3;
            const isChecked = +id === +idPartyVictory;
            return (
              <ListGroup.Item key={id}>
                <Row>
                  { isFinish &&
                    <Col sm="1">
                      <input
                        checked={isChecked}
                        name={id}
                        type="radio"
                        onClick={HandleMakeVictory}
                        disabled={disabled}
                      />
                    </Col>
                  }
                  <Col sm="11">
                    <Form.Control
                      value={itm.participator}
                      onChange={handleChangeRate}
                      placeholder="Ввидите сторону участника"
                      type="text"
                      name="participator"
                      data-id={id}
                      disabled={isDraw || disabled}
                    />
                  </Col>
                </Row>
                {
                  !isDraw &&
                  <Form.Control
                    as="textarea"
                    value={itm.description}
                    onChange={handleChangeRate}
                    placeholder="Ввидите описание"
                    name="description"
                    data-id={id}
                    disabled={disabled}
                  />
                }
                {
                  isDraw &&
                  <Button
                    as={Col}
                    title="Убрать ничью"
                    onClick={handleDeleteDraw}
                  >
                    X
                  </Button>
                }
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Col>
    </Row>
  </>
)
Party.propType = {
  party: PropTypes.shape({}),
  handleChangeRate: PropTypes.func,
  handleDeleteDraw: PropTypes.func,
  HandleMakeVictory: PropTypes.func,
  isFinish: PropTypes.bool,
  disabled: PropTypes.bool,
  idPartyVictory: PropTypes.number,
}

export default Party;
