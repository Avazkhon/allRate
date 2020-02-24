import React from 'react';
import PropTypes from 'prop-types';

const  CreateRateItems = ({
  party,
  handleChangeRate,
}) => (
  <div>
    <ul className="create-rate_item">
      {party.map((itm) => (
          <li key={itm.id}className="create-rate_items">
          <input
            value={itm.participator}
            onChange={handleChangeRate}
            placeholder="Ввидите сторону участника"
            className="create-rate_input"
            type="text"
            name="participator"
            data-id={itm.id}
          >
          </input>
          <textarea
            value={itm.description}
            onChange={handleChangeRate}
            placeholder="Ввидите описание"
            className="create-rate_textarea"
            name="description"
            data-id={itm.id}
          >
          </textarea>
          </li>
        ))}
    </ul>
  </div>
)
CreateRateItems.propType = {
  party: PropTypes.shape({}),
  handleChangeRate: PropTypes.func,
}

export default CreateRateItems;
