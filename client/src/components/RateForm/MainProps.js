import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import CreateFlatpickr from '../CreateFlatpickr';

const timeZone = (() => {
  const array = [];
  for (var i = 12; i > 0; i--) {
    array.push(-i)
  };

  for (var i = 0; i < 15; i++) {
    array.push(i)
  };
  return array;
})();

const MainProps = ({
  title,
  description,
  handleChange,
  dateStart,
  handleChangeDateStart,
  dateFinish,
  dateAlert,
  handleChangeDateFinisOrAlert,
  differenceTime,
  handleChangeDifferenceTime,
  handleDeleteDateFinisOrAlert,
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
        <div>
          { dateAlert && 'предупредить о завершений' }
          { dateFinish && 'Конец ставок'  }
        </div>
        <CreateFlatpickr
          date={dateFinish || dateAlert}
          onChange={handleChangeDateFinisOrAlert}
        />
        <Button onClick={handleDeleteDateFinisOrAlert}>
          { dateFinish ? 'Установить время предупреждения' : 'Установить время завершения' }
        </Button>
      </Col>
      <Col>
        <div>часовой пояс</div>
        <select value={Number(differenceTime)} onChange={handleChangeDifferenceTime}>
          {
            timeZone.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
      </Col>
    </Row>
  </>
);

MainProps.propType = {
  title: PropTypes.string,
  description: PropTypes.string,
  differenceTime: PropTypes.number,
  dateStart: PropTypes.string,
  dateFinish: PropTypes.string,
  dateAlert: PropTypes.string,
  handleChange: PropTypes.func,
  handleChangeDateStart: PropTypes.func,
  handleChangeDateFinisOrAlert: PropTypes.func,
  handleDeleteDateFinisOrAlert: PropTypes.func,
  handleChangeDifferenceTime: PropTypes.func,
}

export default MainProps;
