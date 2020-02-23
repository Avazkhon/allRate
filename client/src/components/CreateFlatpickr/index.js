import "flatpickr/dist/themes/material_green.css";

import React, { Component } from "react";
import Flatpickr from "react-flatpickr";

const CreateFlatpickr = ({ date, onChange }) => (
  <Flatpickr
    data-enable-time
    value={date}
    onChange={onChange}
  />
)

export default CreateFlatpickr;
