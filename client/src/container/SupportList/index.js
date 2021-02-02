import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardSupport from 'components/CardSupport';

import {
  getSupportList,
} from 'actions';

function SupportList({
  getSupportList
}) {
  const [ supportList, setSupportList ] = useState([])


  useEffect(() => {
    getSupportList()
      .then((action) => {
        if(action.status === 'SUCCESS') {
          setSupportList(action.reponse)
        }
      })
  }, [])

  console.log(supportList);
  return (
    <>
      CardSupport
      <CardSupport />
    </>
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
