import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

import {
  ProgressBar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';

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
      changeRating,
      auth: {
        auth: { userId },
        userData: { _id }
      },
      objectId,
    } = this.props;

    changeRating({ userId }, objectId, action)
  }

  render() {
    const {
      lang: {
        lang
      },
      auth: {
        auth,
      },
      objectId,
      isShow,
    } = this.props;
    let {
      rating,
    } = this.props;

    if (!rating) {
      rating = {
        positively: [],
        negative: [],
      }
    }
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
            disabled={isMakeNegative || !auth}
            title={ratingText.negative[lang]}
          >
            <AiFillMinusCircle color={ isMakeNegative ? 'green' : ''} fontSize="20px" />
          </Button>
        }
        <Button
          variant={ !ratingUser && rating.negative.length ? 'danger' : 'secondary'}
          title={ratingText.ratingTitle[lang]}
        >
          <ProgressBar
            now={ratingUser}
            label={`${ratingUser.toFixed()} %`}
          />
        </Button>
          {
            isShow &&
            <Button
              variant="secondary"
              onClick={this.handleChangeRating}
              data-action="positively"
              disabled={isMakePositively || !auth}
              title={ratingText.positively[lang]}
            >
              <AiFillPlusCircle color={ isMakePositively ? 'green' : ''} fontSize="20px"/>
            </Button>
          }
      </ButtonGroup>
    );
  }
};

Rating.propTypes = {
  changeRating: PropTypes.func,
  rating: PropTypes.shape({}),
  objectId: PropTypes.string,
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
  {}
)(Rating);
