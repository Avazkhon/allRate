import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';

import {
  getSupportList,
} from 'actions';
import CardSupport from 'components/CardSupport';

import Layout from '../Layout';

function SupportList({
  getSupportList
}) {
  const [ supportList, setSupportList ] = useState({})


  useEffect(() => {
    getSupportList()
      .then((action) => {
        if(action.status === 'SUCCESS') {
          setSupportList(action.response)
        }
      })
  }, [])

  return (
    <Layout>
      <Grid item >
        <h1>Список Обращении</h1>
        {
          supportList.docs && supportList.docs.map((support) => (
            <CardSupport
              key={support._id}
              support={support}
              isList
            />

          ))
        }
      </Grid>
    </Layout>
  )
}

SupportList.propTypes = {
  support: PropTypes.shape(),
  getSupportList: PropTypes.func
}


function mapStateToProps() {
  return ({

  })
}

export default connect(
  mapStateToProps,
  {
    getSupportList
  }
)(SupportList)
