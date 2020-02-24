import "flatpickr/dist/themes/material_green.css";

import React, { Component } from "react";
import PropTypes from 'prop-types';

import Flatpickr from "react-flatpickr";

const CreateFlatpickr = ({ date, onChange }) => (
  <Flatpickr
    data-enable-time
    value={date}
    onChange={onChange}
  />
);

CreateFlatpickr.propsType = {
  date: PropTypes.string,
  onChange: PropTypes.func,
}

export default CreateFlatpickr;
