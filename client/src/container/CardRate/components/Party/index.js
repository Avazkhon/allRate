import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Party = ({
  party,
  onChangeParticipator
}) => (
  <div className="party">
    <div>Участник:</div>
    <ul className="party__list">
      {
        party.map((itm) => (
          <li key={itm._id} className="party_itm">
            <div>{itm.participator}</div>
            <div className="party_content">
              <textarea
                onChange={onChangeParticipator}
                name="description"
                data-id={itm._id}
                value={itm.description}
                className="party_description"
              >
              </textarea>
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);
Party.propType = {
  party: PropTypes.arrayOf().isRequired,
  onChangeParticipator: PropTypes.func,
}

export default Party;
