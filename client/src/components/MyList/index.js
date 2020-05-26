import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  addCountViewsPost,
  changeRatingPost,
  changeRatingRate,
  addCountViewsRate,
  getCommonRates,
  getUsersByIds,
} from 'actions';

import Messages from 'components/Messages';
import CardPost from 'components/CardPost';
import CardRate from 'components/CardRate';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idOpenItm: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      myList,
      getUsersByIds,
    } = this.props;
    if (!prevProps.myList.length && myList.length) {
      getUsersByIds(myList.map(itm => itm.author || itm.authorId));
    }
  }

  handleShow = (e) => {
    const { addCountViewsPost, addCountViewsRate } = this.props;
    const { id, actionname } = e.currentTarget.dataset;
    this.setState({
      idOpenItm: id
    });
    if (actionname === 'post') {
      addCountViewsPost(id);
    } else {
      addCountViewsRate(id);
    }
  }

  handleHidden = (e) => {
    this.setState({
      idOpenItm: null
    });
  }

  getAuthor = (users, itm) => users.find(user => user._id === itm.author || user._id === itm.authorId)

  render() {
    const {
      idOpenItm,
    } = this.state;
    const {
      myList,
      lang: {
        lang,
      },
      changeRatingPost,
      changeRatingRate,
      getCommonRates,
      isRateList,
      users,
    } = this.props;

    return (
      <div>
      {
        myList.map((itm) => {
          if (itm.mainBet) {
            return (
              <CardRate key={itm._id}
                rate={itm}
                changeRating={changeRatingRate}
                getCommonRates={isRateList && getCommonRates}
                isShow={idOpenItm === itm._id}
                handleShow={this.handleShow}
                handleHidden={this.handleHidden}
                user={users.data && this.getAuthor(users.data, itm)}
              />
            )
          } else {
            return (
              <CardPost key={itm._id}
                changeRating={changeRatingPost}
                post={itm}
                handleShow={this.handleShow}
                handleHidden={this.handleHidden}
                isShow={idOpenItm === itm._id}
                user={users.data && this.getAuthor(users.data, itm)}
              />
            )
          }
        })
      }
      </div>
    );
  }
}

MyList.propType = {
  myList: PropTypes.shape({}),
  users: PropTypes.shape({}),
  addCountViewsPost: PropTypes.func,
  changeRatingPost: PropTypes.func,
  changeRatingRate: PropTypes.func,
  addCountViewsRate: PropTypes.func,
  getCommonRates: PropTypes.func,
  isRateList: PropTypes.bool,
}

function mapStateToProps(state) {
  const {
    lang,
    users
  } = state;
  return {
    lang,
    users,
  };
}

export default connect(mapStateToProps, {
  addCountViewsPost,
  changeRatingPost,
  changeRatingRate,
  addCountViewsRate,
  getCommonRates,
  getUsersByIds,
})(MyList);
