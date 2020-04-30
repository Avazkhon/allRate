import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import {
  getPurse,
} from 'actions';

class Language extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const {
      purse: {
        purse,
      },
      idPurse,
    } = this.props;
    return (
      <DropdownButton
        as={ButtonGroup}
        drop="left"
        title="lang"
      >
        <Dropdown.Item eventKey="1">RU</Dropdown.Item>
        <Dropdown.Item eventKey="2">EN</Dropdown.Item>
      </DropdownButton>
    );
  }
};

Language.propType = {
  auth: PropTypes.shape({}),
  idPurse: PropTypes.bool,
};

function mapStateToProps (state) {
  const {
    auth,
    purse,
  } = state;
  return {
    auth,
    purse,
  };
}
export default connect(
  mapStateToProps,
  {
    getPurse,
  }
)(Language);
