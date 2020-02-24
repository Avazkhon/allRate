import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Party = ({ party }) => (
  <div>
    <ul>
      {
        party.map((itm) => (
          <li key={itm._id}>
            <div>Участник: {itm.participator}</div>
            <div>
              Описание
              <div>
                <p>{itm.description}</p>
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);
Party.propType = {
  party: PropTypes.arrayOf().isRequired,
}

export default Party;
