import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import {
  changeLang,
} from 'actions';

class Language extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentDidUpdate(prevProps) {
    // changeLang
  // }

  handleChangeLang = (e) => {
    const { name } = e.currentTarget;
    const { changeLang } = this.props;
    changeLang(name);
  }

  render() {
    const {
      lang: {
        lang
      }
    } = this.props;
    return (
      <DropdownButton
        as={ButtonGroup}
        drop="left"
        title={`lang: ${lang}`}
      >
        <Dropdown.Item
          name="RU"
          onClick={this.handleChangeLang}
        >
          RU
        </Dropdown.Item>
        <Dropdown.Item
          name="EN"
          onClick={this.handleChangeLang}
        >
          EN
        </Dropdown.Item>
      </DropdownButton>
    );
  }
};

Language.propType = {
  changeLang: PropTypes.func,
};

function mapStateToProps (state) {
  const {
    lang
  } = state;
  return {
    lang
  };
}
export default connect(
  mapStateToProps,
  {
    changeLang,
  }
)(Language);
