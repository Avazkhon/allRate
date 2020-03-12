import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
} from 'react-bootstrap';

import CreateFlatpickr from '../CreateFlatpickr';

const MainProps = ({
  title,
  description,
  handleChange,
  dateStart,
  handleChangeDateStart,
  dateFinish,
  handleChangeDateFinish,
}) => (
  <>
    <Row>
      <Col>
        <Form.Control
          value={title}
          onChange={handleChange}
          placeholder="Ввидите заголовок"
          className="create-rate_input"
          name="title"
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <Form.Control
          as="textarea"
          value={description}
          onChange={handleChange}
          placeholder="Ввидите описание"
          className="create-rate_textarea"
          name="description"
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <div>
          <div>Начало ставок</div>
          <CreateFlatpickr
            date={dateStart}
            onChange={handleChangeDateStart}
          />
        </div>
      </Col>
      <Col>
        <div>Конец ставок</div>
        <CreateFlatpickr
          date={dateFinish}
          onChange={handleChangeDateFinish}
        />
      </Col>
    </Row>
  </>
);

MainProps.propType = {
  title: PropTypes.string,
  description: PropTypes.string,
  dateStart: PropTypes.string,
  dateFinish: PropTypes.string,
  handleChange: PropTypes.func,
  handleChangeDateStart: PropTypes.func,
  handleChangeDateFinish: PropTypes.func,
}

export default MainProps;
