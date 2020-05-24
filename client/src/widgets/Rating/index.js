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
  getMyList,
  getMyNews,
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
      changeRating,
      getMyList,
      getMyNews,
      getUserById,
      auth: {
        auth: { userId },
        userData: { _id }
      },
      postId,
      myList,
    } = this.props;
    changeRating({ userId, makeTime: new Date() }, postId, action)
    .then((action) => {
      if (action.status === 'SUCCESS') {
        if (myList.list === 'myList') {
          getMyList(userId);
        }
        if (myList.list === 'myNews') {
          getMyNews(userId);
        }
        if (getUserById) {
          getUserById(_id);
        }
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
      postId,
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
            disabled={isMakeNegative}
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
            label={`${ratingUser.toFixed(2)} %`}
          />
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
  getMyList: PropTypes.func,
  getMyNews: PropTypes.func,
  getUserById: PropTypes.func,
  changeRating: PropTypes.func,
  rating: PropTypes.shape({}),
  myList: PropTypes.shape({}),
  postId: PropTypes.string,
  isShow: PropTypes.bool,
};

function mapStateToProps (state) {
  const {
    lang,
    auth,
    myList,
  } = state;
  return {
    lang,
    auth,
    myList
  };
}
export default connect(
  mapStateToProps,
  {
    getMyList,
    getMyNews,
  }
)(Rating);
