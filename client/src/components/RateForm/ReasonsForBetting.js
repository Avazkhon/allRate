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
}) => (
  <>
    <Row>
      <Col>
        <ListGroup>
          {
            reasonsForBetting.map(({title, idParty, idRFB}) => (
              <ListGroup.Item key={idRFB}>
                <Form.Control
                  value={title}
                  data-idrfb={idRFB}
                  onChange={handleChangeRFB}
                >
                </Form.Control>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Col>
    </Row>
  </>
)
ReasonsForBetting.propType = {
  party: PropTypes.shape({}),
  reasonsForBetting: PropTypes.shape({}),
  handleChangeRFB: PropTypes.func,
}

export default ReasonsForBetting;
