import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';

import CreateFlatpickr from '../CreateFlatpickr';
import style from './style/styleMainProps';

const timeZone = (() => {
  const array = [];
  for (let i = 12; i > 0; i--) {
    array.push(-i);
  }

  for (let i = 0; i < 15; i++) {
    array.push(i);
  }
  return array;
})();

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
  dateAlert,
  handleChangeDateFinisOrAlert,
  differenceTime,
  handleChangeDifferenceTime,
  handleDeleteDateFinisOrAlert,
  disabled,
  classes,
  validatinos,
}) => (
  <>
    <Form.Control
      style={isValid(validatinos.title)}
      value={title}
      onChange={handleChange}
      placeholder="Ввидите заголовок"
      name="title"
      disabled={disabled}
    />
    <Form.Control
      as="textarea"
      style={isValid(validatinos.description)}
      value={description}
      onChange={handleChange}
      placeholder="Ввидите описание"
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
        <div>
          <input
            className={
              classnames(
                classes['main-props_btn-default'],
                {[classes['main-props_btn-select']]: dateFinish }
              )
            }
            type="button"
            name="dateFinish"
            onClick={handleDeleteDateFinisOrAlert}
            disabled={disabled}
            id="dateFinish"
            value="Завершения"
            title="Установить время завершения"
          />
        </div>
        <div>
          <input
            className={
              classnames(
                classes['main-props_btn-default', 'size-text'],
                {[classes['main-props_btn-select']]: dateAlert }
              )
            }
            type="button"
            name="dateAlert"
            value='Предупреждения'
            title='Установить время предупреждения'
            onClick={handleDeleteDateFinisOrAlert}
            disabled={disabled}
            id="dateAlert"
          />
        </div>
      </div>
      <div>
        <div>часовой пояс</div>
        <select
          value={Number(differenceTime)}
          onChange={handleChangeDifferenceTime}
          disabled={disabled}
        >
          {
            timeZone.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))
          }
        </select>
      </div>
      <div>
        <span>
          { dateAlert && 'предупредить о завершений' }
          { dateFinish && 'Конец ставок'  }
        </span>
        <CreateFlatpickr
          date={dateFinish || dateAlert}
          onChange={handleChangeDateFinisOrAlert}
          disabled={disabled}
        />
      </div>
    </div>
  </>
);

MainProps.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  differenceTime: PropTypes.number,
  dateStart: PropTypes.shape(),
  dateFinish: PropTypes.shape(),
  dateAlert: PropTypes.shape(),
  handleChange: PropTypes.func,
  handleChangeDateStart: PropTypes.func,
  handleChangeDateFinisOrAlert: PropTypes.func,
  handleDeleteDateFinisOrAlert: PropTypes.func,
  handleChangeDifferenceTime: PropTypes.func,
  disabled: PropTypes.bool,
  classes: PropTypes.shape(),
  validatinos: PropTypes.shape(),
}

export default injectSheet(style)(MainProps);
