import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ProgressBar,
} from 'react-bootstrap';

import {
  // changeLang,
} from 'actions';

class Rating extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentDidUpdate(prevProps) {
    // changeLang
  // }

  render() {
    const {
      lang: {
        lang
      },
      rating,
    } = this.props;
    const allCount = rating.positively.length + rating.negative.length;
    const ratingUser = (rating.positively.length / (allCount ? allCount : 1)) * 100;
    return (
      <>
        <ProgressBar now={ratingUser} label={`${ratingUser}%`} />
      </>
    );
  }
};

Rating.propType = {
  changeLang: PropTypes.func,
  rating: PropTypes.shape({})
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
    // changeLang,
  }
)(Rating);
