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

const ratingText = {
  negative: { RU: 'Негативный отзыв', EN: 'Negative feedback' },
  positively: { RU: 'Положительный отзыв', EN: 'Positively feedback' },
  ratingTitle: { RU: 'Райтинг', EN: 'rating' },
};

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
      auth: {
        auth,
      },
      rating,
      postId,
      isShow,
    } = this.props;
    const allCount = rating.positively.length + rating.negative.length;
    const ratingUser = (rating.positively.length / (allCount ? allCount : 1)) * 100;
    const isMakePositively = auth && rating.positively.some(user => user.userId === auth.userId )
    const isMakeNegative = auth && rating.negative.some(user => user.userId === auth.userId )
    return (
      <ButtonGroup size="sm">
        {
          isShow &&
          <Button
            variant="secondary"
            onClick={this.handleChangeRating}
            data-action="negative"
            disabled={isMakeNegative}
            title={ratingText.negative[lang]}
          >
            <AiFillMinusCircle color={ isMakeNegative ? 'green' : ''} fontSize="20px" />
          </Button>
        }
        <Button variant="secondary" title={ratingText.ratingTitle[lang]} >
          <ProgressBar now={ratingUser} label={`${ratingUser.toFixed(2)} %`} />
        </Button>
          {
            isShow &&
            <Button
              variant="secondary"
              onClick={this.handleChangeRating}
              data-action="positively"
              disabled={isMakePositively}
              title={ratingText.positively[lang]}
            >
              <AiFillPlusCircle color={ isMakePositively ? 'green' : ''} fontSize="20px"/>
            </Button>
          }
      </ButtonGroup>
    );
  }
};

Rating.propType = {
  changeRatingPost: PropTypes.func,
  getMyList: PropTypes.func,
  rating: PropTypes.shape({}),
  postId: PropTypes.string,
  isShow: PropTypes.bool,
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
