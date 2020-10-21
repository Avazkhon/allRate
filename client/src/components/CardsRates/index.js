import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  Form,
  Button,
} from 'react-bootstrap';

import {
  getDataUserFromLocalStorag,
} from 'utils';

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

  componentDidMount() {
    const user= getDataUserFromLocalStorag();
    if (user) {
      this.userId = user.userId;
    }
    this.handleChangePagination();
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


  handleChangePagination = (increment) => {
    const incrementPage = increment ? increment : 0;
    const { getRatesPage, history, userId, getUsersByIds } = this.props;
    const { page = 1, limit = 24, ...moreParams } = queryString.parse(location.search);
    const { content: hash } = queryString.parse(history.location.hash);
    const nexQueryParams = queryString.stringify({ ...moreParams, page: Number(page) + incrementPage, limit});
    let userParams = { authorId: userId || this.userId };
    if (hash === 'subscribtion_rates') {
      userParams = { subscriptionsId: userId || this.userId}
    }

    getRatesPage({page: Number(page) + incrementPage, limit, ...moreParams, ...userParams})
    .then((action) => {
      if (action.status === 'SUCCESS' && action.response.docs.length) {
        getUsersByIds(action.response.docs.map(itm => itm.author || itm.authorId));
      }
    });
    history.push({
      search: nexQueryParams,
      hash: history.location.hash
    });
  }

  handleGetRatesPage = () => {
    this.handleChangePagination(1);
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

      {
        rates.data && rates.data.hasNextPage &&
            <Button className="d-block mx-auto" onClick={this.handleGetRatesPage}>Загрузить</Button>
      }

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
