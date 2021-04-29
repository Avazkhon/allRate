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
  Fade,
  MenuItem,
  Menu,
  Button
} from '@material-ui/core';

import {
  getAlbums
} from 'actions';

import ImageGridList from 'widgets/ImageGridList'


const useStyles = makeStyles((theme) => ({
  albums: {
    // backgroundColor: theme.palette.background.paper,
  },
  albums__menu: {
    flex: 1,
    paddingLeft: '24px'
  },
  albums__menuButton: {
    margin: '16px',
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (auth.auth?.userId) {
    getAlbums({ userId: auth.auth.userId })
      .then((action) => {
        console.log(action);
      })
    }
  }, [auth.auth])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.albums}>
      <div className={classes.albums__menu}>
        {id && (<h4>Текущий альбом: {id}</h4>)}
        <Button
          className={classes.albums__menuButton}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Выбрать альбом
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {
            albums?.data?.albums?.map((({ _id, name }) => {
              return (
                <MenuItem
                  onClick={handleClose}
                  key={_id}
                  className={classNames({[classes.albums_itemLinkActive]: !id || name === id})}
                >
                  <Link to={`${pathname}?id=${name}`} className={classes.albums_link}>
                    {name}
                  </Link>
                </MenuItem>
              )
            }))
          }
        </Menu>
      </div>
      <div className={classes.albums__images}>
        {
          albums?.data?.albums?.map((({ _id, name, images }) => {
            if ((!id && name === 'main' ) || (name === id)) {
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