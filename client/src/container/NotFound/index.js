import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import style from './style';
import Layout from '../Layout';


const NotFound = ({
  classes,
}) => (
  <Layout>
    <div className={classes['not-found']}>
      Not Found
    </div>
  </Layout>
);

NotFound.propType = {
  classes: PropTypes.shape({}),
}


export default injectSheet(style)(NotFound);
