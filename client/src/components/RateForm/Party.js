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
}) => (
  <>
    <Row>
      <Col>
        <ListGroup>
          {party.map((itm) => {
            const id = itm._id || itm.id;
            const isDraw = id === 3;
            return (
              <ListGroup.Item key={id}>
                <Form.Control
                  value={itm.participator}
                  onChange={handleChangeRate}
                  placeholder="Ввидите сторону участника"
                  type="text"
                  name="participator"
                  data-id={id}
                  disabled={isDraw}
                />
                {
                  !isDraw &&
                  <Form.Control
                    as="textarea"
                    value={itm.description}
                    onChange={handleChangeRate}
                    placeholder="Ввидите описание"
                    name="description"
                    data-id={id}
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
}

export default Party;
