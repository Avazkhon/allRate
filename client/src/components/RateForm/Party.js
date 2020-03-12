import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Form,
  ListGroup,
} from 'react-bootstrap';

const Party = ({
  party,
  handleChangeRate,
}) => (
  <>
    <Row>
      <Col>
        <ListGroup>
          {party.map((itm) => (
              <ListGroup.Item key={itm._id || itm.id}>
              <Form.Control
                value={itm.participator}
                onChange={handleChangeRate}
                placeholder="Ввидите сторону участника"
                type="text"
                name="participator"
                data-id={itm.id}
              />
              <Form.Control
                as="textarea"
                value={itm.description}
                onChange={handleChangeRate}
                placeholder="Ввидите описание"
                name="description"
                data-id={itm.id}
              />
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    </Row>
  </>
)
Party.propType = {
  party: PropTypes.shape({}),
  handleChangeRate: PropTypes.func,
}

export default Party;
