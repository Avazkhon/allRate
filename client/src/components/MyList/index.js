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
                isShow={idOpenItm === itm._id}
                handleShow={this.handleShow}
                handleHidden={this.handleHidden}
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
                lang={lang}
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
  addCountViewsPost: PropTypes.func,
  changeRatingPost: PropTypes.func,
  changeRatingRate: PropTypes.func,
  addCountViewsRate: PropTypes.func,
}

function mapStateToProps(state) {
  const {
    lang,
  } = state;
  return {
    lang,
  };
}

export default connect(mapStateToProps, {
  addCountViewsPost,
  changeRatingPost,
  changeRatingRate,
  addCountViewsRate,
})(MyList);
