import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';


import {
  IconButton,
} from '@material-ui/core';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const ratingText = {
  negative: { RU: 'Негативный отзыв', EN: 'Negative feedback' },
  positively: { RU: 'Положительный отзыв', EN: 'Positively feedback' },
  ratingTitle: { RU: 'Райтинг', EN: 'rating' },
};

const useStyles = makeStyles(() => ({
  isLike: {
    color: blue[700],
  },
}));


function Rating({
  changeRating,
  auth: {
    auth,
  },
  objectId,
  lang,
  rating,
  isShow: isRightsMakeAction,
}) {
  const classes = useStyles();
  const [ isFetching, changeFetching ] = useState(false)

  function handleChangeRating(e) {
    const { action } = e.currentTarget.dataset;
    changeFetching(true)
    changeRating({ userId: auth.userId }, objectId, action)
      .then(() => changeFetching(false))
  }

  if (!rating) {
    rating = {
      positively: [],
      negative: [],
    }
  }

  const isMakePositively = auth && rating.positively.some(user => user.userId === auth.userId )
  const isMakeNegative = auth && rating.negative.some(user => user.userId === auth.userId )

  return (
    <>
      <IconButton
        aria-label="Thumb down"
        onClick={handleChangeRating}
        data-action="negative"
        disabled={isMakeNegative || !auth || isFetching || !isRightsMakeAction}
        title={ratingText.negative[lang]}
      >
        <ThumbDownIcon fontSize="small" className={clsx('', {[classes.isLike]: isMakeNegative})} /> {rating.negative.length}
      </IconButton>
      <IconButton
        aria-label="Thumb up"
        onClick={handleChangeRating}
        data-action="positively"
        disabled={isMakePositively || !auth || isFetching || !isRightsMakeAction}
        title={ratingText.positively[lang]}
      >
        <ThumbUpIcon fontSize="small" className={clsx('', {[classes.isLike]: isMakePositively})} /> {rating.positively.length}
      </IconButton>
    </>
  );
}

Rating.propTypes = {
  changeRating: PropTypes.func,
  rating: PropTypes.shape(),
  auth: PropTypes.shape(),
  objectId: PropTypes.string,
  lang: PropTypes.shape(),
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
