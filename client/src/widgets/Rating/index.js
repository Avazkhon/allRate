import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

import {
  ProgressBar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';

import {
  changeRatingPost,
  getMyList,
} from 'actions';

class Rating extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentDidUpdate(prevProps) {
    // changeLang
  // }

  handleChangeRating = (e) => {
    const { action } = e.currentTarget.dataset;
    const {
      changeRatingPost,
      getMyList,
      auth: {
        auth: { userId },
      },
      postId,
    } = this.props;
    changeRatingPost({ userId, makeTime: new Date() }, postId, action)
    .then((action) => {
      if (action.status === 'SUCCESS') {
        getMyList(userId);
      }
    });
  }

  render() {
    const {
      lang: {
        lang
      },
      rating,
      postId,
    } = this.props;
    const allCount = rating.positively.length + rating.negative.length;
    const ratingUser = (rating.positively.length / (allCount ? allCount : 1)) * 100;
    return (
      <ButtonGroup size="sm">
        <Button
          variant="secondary"
          onClick={this.handleChangeRating}
          data-action="negative"
        >
          <AiFillMinusCircle/>
        </Button>
        <Button variant="secondary">
          <ProgressBar now={ratingUser} label={`${ratingUser.toFixed(2)} %`} />
        </Button>
        <Button
          variant="secondary"
          onClick={this.handleChangeRating}
          data-action="positively"
        >
          <AiFillPlusCircle/>
        </Button>
      </ButtonGroup>
    );
  }
};

Rating.propType = {
  changeRatingPost: PropTypes.func,
  getMyList: PropTypes.func,
  rating: PropTypes.shape({}),
  postId: PropTypes.string,
};

function mapStateToProps (state) {
  const {
    lang,
    auth,
  } = state;
  return {
    lang,
    auth,
  };
}
export default connect(
  mapStateToProps,
  {
    changeRatingPost,
    getMyList,
  }
)(Rating);
