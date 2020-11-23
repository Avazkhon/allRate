import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Form,
} from 'react-bootstrap';

import CreateFlatpickr from '../CreateFlatpickr';
import style from './style/styleMainProps';

function isValid (props) {
  if (props) {
    return  {border: '1px solid red'};
  }
}

const MainProps = ({
  title,
  description,
  handleChange,
  dateStart,
  handleChangeDateStart,
  dateFinish,
  handleChangeDateFinis,
  disabled,
  classes,
  validatinos,
}) => (
  <>
    <Form.Control
      style={isValid(validatinos.title)}
      title={validatinos.title}
      value={title}
      onChange={handleChange}
      placeholder="Введите заголовок"
      name="title"
      disabled={disabled}
    />
    <Form.Control
      as="textarea"
      style={isValid(validatinos.description)}
      title={validatinos.description}
      value={description}
      onChange={handleChange}
      placeholder="Введите описание"
      name="description"
      disabled={disabled}
    />
    <div className={classes['main-props__btn-group']}>
      <div>
        <span>Начало ставок</span>
        <CreateFlatpickr
          date={dateStart}
          onChange={handleChangeDateStart}
        />
      </div>
      <div>
        <span>
          Конец ставок
        </span>
        <CreateFlatpickr
          date={dateFinish}
          onChange={handleChangeDateFinis}
          disabled={disabled}
        />
      </div>
    </div>
  </>
);

MainProps.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  dateStart: PropTypes.string,
  dateFinish: PropTypes.string,
  handleChange: PropTypes.func,
  handleChangeDateStart: PropTypes.func,
  handleChangeDateFinis: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.shape(),
  validatinos: PropTypes.shape(),
}

export default injectSheet(style)(MainProps);
