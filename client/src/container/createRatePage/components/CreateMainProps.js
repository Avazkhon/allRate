import React from 'react';
import PropTypes from 'prop-types';

import CreateFlatpickr from '../../../components/CreateFlatpickr';

const  CreateMainProps = ({
  title,
  description,
  handleChange,
  dateStart,
  handleChangeDateStart,
  dateFinish,
  handleChangeDateFinish,
}) => (
  <div className="creat-pain-props">
    <input
      value={title}
      onChange={handleChange}
      placeholder="Ввидите заголовок"
      className="create-rate_input"
      type="text"
      name="title"
    >
    </input>
    <textarea
      value={description}
      onChange={handleChange}
      placeholder="Ввидите описание"
      className="create-rate_textarea"
      name="description"
    >
    </textarea>

    <div>
      <div>Начало ставок</div>
      <CreateFlatpickr
        date={dateStart}
        onChange={handleChangeDateStart}
      />
    </div>

    <div>
      <div>Конец ставок</div>
      <CreateFlatpickr
        date={dateFinish}
        onChange={handleChangeDateFinish}
      />
    </div>
  </div>
)
CreateMainProps.propType = {
  title: PropTypes.string,
  description: PropTypes.string,
  dateStart: PropTypes.string,
  dateFinish: PropTypes.string,
  handleChange: PropTypes.func,
  handleChangeDateStart: PropTypes.func,
  handleChangeDateFinish: PropTypes.func,
}

export default CreateMainProps;
