import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-drag-drawer'

import './style.css';

const CommonModal = ({
  open,
  toggle,
  children,
}) => (
  <Drawer
    open={open}
    onRequestClose={toggle}
    modalElementClass="drawer-modal"
  >
    {children}
  </Drawer>
)

CommonModal.propType = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
}

export default CommonModal;
