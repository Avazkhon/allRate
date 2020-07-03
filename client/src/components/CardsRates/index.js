import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  changeRatingRate,
  addCountViewsRate,
  getCommonRates,
  getUsersByIds,
  getRatesPage,
} from 'actions';

import Messages from 'components/Messages';
import CardRate from 'components/CardRate';
import NexLoadPage from 'widgets/NexLoadPage';

class CardsRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idOpenItm: null,
    }
  }

  handleShow = (e) => {
    const { addCountViewsRate } = this.props;
    const { id, actionname } = e.currentTarget.dataset;
    this.setState({
      idOpenItm: id
    });
    addCountViewsRate(id);
  }

  handleHidden = (e) => {
    this.setState({
      idOpenItm: null
    });
  }

  getAuthor = (users, itm) => users.find(user => user._id === itm.author || user._id === itm.authorId)

  handleGetRatesPage = (page, limit) => {
    const { getRatesPage, userId, getUsersByIds } = this.props;
    getRatesPage({ page, limit, userId })
    .then((action) => {
      if (action.status === 'SUCCESS') {
        getUsersByIds(action.response.docs.map(itm => itm.author || itm.authorId));
      }
    })
  }

  render() {
    const {
      idOpenItm,
    } = this.state;
    const {
      rates,
      lang: {
        lang,
      },
      changeRatingRate,
      getCommonRates,
      isRateList,
      users,
      history,
    } = this.props;

    return (
      <div>
      {
        rates.data && rates.data.docs.map((itm) => {
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
        })
      }

      <NexLoadPage
        isFetching={rates.isFetching}
        hasNextPage={rates.data && rates.data.hasNextPage}
        actionForLoad={this.handleGetRatesPage}
        history={history}
      />

      </div>
    );
  }
}

CardsRates.propTypes = {
  rates: PropTypes.shape({}),
  users: PropTypes.shape({}),
  changeRatingRate: PropTypes.func,
  addCountViewsRate: PropTypes.func,
  getCommonRates: PropTypes.func,
  getRatesPage: PropTypes.func,
  getUsersByIds: PropTypes.func,
  isRateList: PropTypes.bool,
}

function mapStateToProps(state) {
  const {
    lang,
    users
  } = state;
  return {
    lang,
    users: {
      data: users.data.docs,
    }
  };
}

export default connect(mapStateToProps, {
  changeRatingRate,
  addCountViewsRate,
  getCommonRates,
  getUsersByIds,
  getRatesPage,
})(CardsRates);
