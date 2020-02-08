import React from 'react';
import PropTypes from 'prop-types';

const  CreateRateItems = ({
  rates,
  handleChangeRate,
}) => (
  <div>
    <ul className="create-rate_item">
      {rates.map((rate) => (
          <li key={rate.id}className="create-rate_items">
          <input
            value={rate.side}
            onChange={handleChangeRate}
            placeholder="Ввидите сторону участника"
            className="create-rate_input"
            type="text"
            name="side"
            data-id={rate.id}
          >
          </input>
          <textarea
            value={rate.description}
            onChange={handleChangeRate}
            placeholder="Ввидите описание"
            className="create-rate_textarea"
            name="description"
            data-id={rate.id}
          >
          </textarea>
          </li>
        ))}
    </ul>
  </div>
)
CreateRateItems.propType = {
  rates: PropTypes.shape({}),
  handleChangeRate: PropTypes.func,
}

export default CreateRateItems;
