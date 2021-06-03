import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { Helmet } from "react-helmet";

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
  const {
    categories,
  } = props;
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const [ metaTags, setMetaTags ] = useState(null);
  const paramsArray = params &&  Object.values(params);

  useEffect(() => {
    if (categories.data.children?.length && (location.pathname.indexOf('/bets') >= 0)) {
      getMetaDescription(categories.data.children, paramsArray, setMetaTags);
    }
  }, [params, categories.data]);

  function getMetaDescription(children, paramsArray, setMetaTags, childrenCount = 0) {
    const innerChildren = children.find((menuItem) => menuItem.code === paramsArray[childrenCount])
    if (innerChildren && innerChildren.children && paramsArray[childrenCount + 1]) {
      childrenCount++;
      getMetaDescription(innerChildren.children, paramsArray, setMetaTags, childrenCount);
    } else {
      setMetaTags(innerChildren)
    }
  }


  return (
    <React.StrictMode>
      {
        metaTags && (
          <Helmet>
            {
              metaTags.description && (
                <meta name="description" content={metaTags.description} />
              )
            }
            {
              metaTags.name && (
                <title>Ставки на - { metaTags.name }</title>
              )
            }
          </Helmet>
        )
      }
      <div className="layout-header">
        <Header/>
      </div>
      <div style={{display: 'flex'}} className='content'>
        <Menu />
        <Container maxWidth="sm" className={classes.container}>
          {
            metaTags && metaTags.name && (
              <h1>Ставки на - {metaTags.name}</h1>
            )
          }
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

function mapStateToProps(state, context) {
  const {
    auth,
    categories
  } = state;
  return {
    auth,
    categories
  };
}

export default connect(
  mapStateToProps,
  {}
)(Layout);
