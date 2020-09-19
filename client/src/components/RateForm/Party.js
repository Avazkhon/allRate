import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Form,
  ListGroup,
  Button,
} from 'react-bootstrap';

function isValid (props) {
  if (props) {
    return  {border: '1px solid red'};
  }
}

const Party = ({
  party,
  handleChangeRate,
  handleDeleteDraw,
  HandleMakeVictory,
  isFinish,
  idPartyVictory,
  isArchive,
  isPaymentMade,
  validatinos,
}) => (
  <>
    <Row>
      <Col>
        <ListGroup>
          {party.map((itm, i) => {
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
                        disabled={isArchive || isPaymentMade}
                      />
                    </Col>
                  }
                  <Col sm="11">
                    <Form.Control
                      value={itm.participator}
                      style={validatinos[i] && isValid(validatinos[i].participator)}
                      onChange={handleChangeRate}
                      placeholder="Ввидите сторону участника"
                      type="text"
                      name="participator"
                      data-id={id}
                      disabled={isDraw || isArchive}
                    />
                  </Col>
                </Row>
                {
                  !isDraw &&
                  <Form.Control
                    as="textarea"
                    style={validatinos[i] && isValid(validatinos[i].description)}
                    value={itm.description}
                    onChange={handleChangeRate}
                    placeholder="Ввидите описание"
                    name="description"
                    data-id={id}
                    disabled={isArchive}
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
Party.propTypes = {
  party: PropTypes.arrayOf(PropTypes.shape()),
  handleChangeRate: PropTypes.func,
  handleDeleteDraw: PropTypes.func,
  HandleMakeVictory: PropTypes.func,
  isFinish: PropTypes.bool,
  isArchive: PropTypes.bool,
  isPaymentMade: PropTypes.bool,
  idPartyVictory: PropTypes.number,
  validatinos: PropTypes.arrayOf(PropTypes.shape()),
};


export default Party;
