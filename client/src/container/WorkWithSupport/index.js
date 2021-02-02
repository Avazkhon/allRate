import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  Grid
} from '@material-ui/core';

import {
  getSupportByID,
} from 'actions';
import CardSupport from 'components/CardSupport';

import Layout from '../Layout';

function WorkWithSupport({
  getSupportByID,
  history,
}) {
  const [ support, setSupport ] = useState({})


  useEffect(() => {
    const { supportId } = queryString.parse(history.location.search)
    getSupportByID(supportId)
      .then((action) => {
        if(action.status === 'SUCCESS') {
          setSupport(action.response)
        }
      })
  }, [])

  return (
    <Layout>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item >
          <h1>Обращение</h1>
          {
            <CardSupport
              support={support}
            />
          }
        </Grid>
      </Grid>
    </Layout>
  )
}

WorkWithSupport.propTypes = {
  support: PropTypes.shape(),
  history: PropTypes.shape(),
  getSupportByID: PropTypes.func
}


function mapStateToProps() {
  return ({

  })
}

export default connect(
  mapStateToProps,
  {
    getSupportByID
  }
)(WorkWithSupport)
