import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import injectSheet from 'react-jss';

import {
  Button,
} from '@material-ui/core';

import {
  changeRatingRate,
  addCountViewsRate,
  getUsersByIds,
  searchBets,
} from 'actions';

import CardRate from 'components/CardRate';

import style from './style';

function CardsRates({
  rates,
  changeRatingRate,
  users,
  classes,


  searchBets,
  addCountViewsRate,
  getUsersByIds
}){
    let history = useHistory()
    let location = useLocation()
    const [ idOpenItm, setIdOpenItm ] = useState(null);

    useEffect(() => {
        searchBets(location.pathname.slice(1) + location.search)
          .then((action) => {
            if (action.status === 'SUCCESS' && action.response.docs.length) {
              getUsersByIds(action.response.docs.map(itm => itm.author || itm.authorId));
            }
          });
    }, [ location ])


    function handleShow(e) {
      const { id } = e.currentTarget.dataset;
      setIdOpenItm(id)
      addCountViewsRate(id);
    }

    function handleHidden() {
      setIdOpenItm(null)
    }

    function getAuthor(users, itm){
      return users.find(user => user._id === itm.author || user._id === itm.authorId)
    }

    function handlesearchBets() {
      const { limit, page } = queryString.parse(location.search)

      if(limit && page) {
        history.push({
          search: queryString.stringify({ limit: limit, page: Number(page) + 1 })
        })
      } else {
        history.push({ search: queryString.stringify({ limit: 24, page: 1 })})
      }
    }


    return (
      <div className={classes['bett-list']}>
      {
        rates.data && rates.data.docs.map((itm) => {
          return (
            <CardRate key={itm._id}
              rate={itm}
              changeRating={changeRatingRate}
              isShow={idOpenItm === itm._id}
              handleShow={handleShow}
              handleHidden={handleHidden}
              user={users.data && getAuthor(users.data, itm)}
            />
          )
        })
      }

      {
        rates.data && rates.data.hasNextPage &&
            <Button variant="contained" color="primary" onClick={handlesearchBets}>Загрузить</Button>
      }

      </div>
    )
}

CardsRates.propTypes = {
  rates: PropTypes.shape(),
  users: PropTypes.shape(),
  classes: PropTypes.shape(),
  changeRatingRate: PropTypes.func,
  addCountViewsRate: PropTypes.func,
  searchBets: PropTypes.func,
  getUsersByIds: PropTypes.func,
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

export default injectSheet(style) (
  connect(mapStateToProps, {
    changeRatingRate,
    addCountViewsRate,
    getUsersByIds,
    searchBets,
  })(CardsRates)
)
