import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
} from '@material-ui/core';

import {
  getAlbums
} from 'actions';

import ImageGridList from 'widgets/ImageGridList'


const useStyles = makeStyles((theme) => ({
  albums: {
    display: 'flex',
    // backgroundColor: theme.palette.background.paper,
  },
  albums__menu: {
    flex: 1,
    paddingLeft: '24px'
  },
  albums__images: {
    flex: 2
  },
  albums_itemLink: {
    background: '#dcdcdc',
  },
  albums_itemLinkActive: {
    background: '#f0f8ff',
  },
  albums_link: {
    '&:hover': {
      textDecoration: 'none'

    }
  }

}));


function AlbumsComponent(props) {
  const {
    auth,
    getAlbums,
    albums,
  } = props;

  const {
    pathname,
    search
  } = useLocation();

  const {
    id
  } = queryString.parse(search);

  const classes = useStyles();

  useEffect(() => {
    if (auth.auth?.userId) {
    getAlbums({ userId: auth.auth.userId })
      .then((action) => {
        console.log(action);
      })
    }
  }, [auth.auth])


  return (
    <div className={classes.albums}>
      <div className={classes.albums__images}>
        {
          albums?.data?.albums?.map((({ _id, name, images }) => {
            if (name === id) {
              return (
                <div key={_id}>
                  <ImageGridList
                    tileData={images}
                  />
                </div>
              )
            }
            return null;
          }))
        }
      </div>
      <div className={classes.albums__menu}>
        <h4>Выбор альбома</h4>
        <List component="nav" className={classes.root} aria-label="contacts">
          {
            albums?.data?.albums?.map((({ _id, name }) => {
              return (
                <ListItem
                  button key={_id}
                  className={classNames({[classes.albums_itemLinkActive]: !id || name === id})}
                >
                  <Link to={`${pathname}?id=${name}`} className={classes.albums_link}>
                    {name}
                  </Link>
                </ListItem>
              )
            }))
          }
        </List>
      </div>
    </div>
  )
}

AlbumsComponent.propTypes = {
  auth: PropTypes.shape({}),
}

function mapStateToProps(state) {
  const {
    auth,
    albums
  } = state;
  return {
    auth,
    albums,
  };
}

export const Albums = connect(
  mapStateToProps,
  {
  getAlbums
})(AlbumsComponent)