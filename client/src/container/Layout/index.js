import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Menu from 'components/Menu';

import Header from '../Header';
import Footer from '../Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 24,
  }
}));

const Layout = (props) => {
  const classes = useStyles()
  return (
    <React.StrictMode>
      <div className="layout-header">
        <Header/>
      </div>
      <div style={{display: 'flex'}} className='content'>
        <Menu />
        <Container maxWidth="sm" className={classes.container}>
          {props.children}
        </Container>
      </div>
      <div className="layout-footer">
        <Footer />
      </div>
    </React.StrictMode>
  );
}

Layout.propTypes = {
  children: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
  } = state;
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  {}
)(Layout);
