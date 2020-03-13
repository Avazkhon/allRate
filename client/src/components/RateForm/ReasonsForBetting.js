import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Form,
  ListGroup,
} from 'react-bootstrap';

const ReasonsForBetting = ({
  party,
  reasonsForBetting,
  handleChangeRFB,
  handleChangeIdpartInRFB,
}) => (
  <>
    <Row>
      <Col>
        <ListGroup>
          {
            reasonsForBetting.map(({title, idParty, idRFB}) => (
              <ListGroup.Item key={idRFB}>
                <Row>
                  <Col xs="12" sm="8">
                    <Form.Control
                      value={title}
                      data-idrfb={idRFB}
                      onChange={handleChangeRFB}
                    >
                    </Form.Control>
                  </Col>
                  <Col xs="12" sm="4">
                    <Form.Control
                      as="select"
                      value={idParty}
                      onChange={handleChangeIdpartInRFB}
                      data-id={idRFB}
                    >
                      <option value="all">общее</option>
                      {
                        party.map(({ id, participator }) => (
                          <option
                            key={id}
                            value={id}
                          >
                            {participator}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
    </Row>
  </>
);

ReasonsForBetting.propType = {
  party: PropTypes.shape({}),
  reasonsForBetting: PropTypes.shape({}),
  handleChangeRFB: PropTypes.func,
  handleChangeIdpartInRFB: PropTypes.func,
}

export default ReasonsForBetting;
