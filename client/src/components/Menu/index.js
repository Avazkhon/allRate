import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
  Hidden,
} from '@material-ui/core';


import RecursiveTreeView from 'widgets/RecursiveTreeView';

import {
  getCategories,
} from 'actions'



const useStyles = makeStyles((theme) => {
  const drawerWidth = '250px';
  return ({
    link: {
      color: 'black',
      '&:hover': {
        color: 'black',
        textDecoration: 'none',
      }
    },
    drawerPaper: {
      width: drawerWidth,
      display: 'block',
      position: 'relative',
      zIndex: 100
    },
    list: {
      width: drawerWidth,
    },
    fullList: {
      width: 'auto',
    },
    openMenu: {
      position: 'fixed',
      zIndex: 100,
      opacity: '0.4'
    }
  })
})

function Menu({
  getCategories,
  categories,
  auth: {
    userData
  }
}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();

  useEffect(() => {
    getCategories()
  }, []);

  const anchor = 'left';
  const [show, setShow] = React.useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setShow(!show);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onKeyDown={toggleDrawer}
      >
        <List>
          {
            mobileOpen &&
            <ListItem button>
              <Button
                variant="contained"
                color="primary"
                className={classes.openMenu}
                onClick={handleDrawerToggle}
            >
              {'<'}
            </Button>
            </ListItem>
          }
          {
            userData && userData._id &&
            <ListItem button>
              <ListItemText primary={<Link className={classes.link} to='/create-rate'>Создать ставку</Link>}/>
            </ListItem>
          }
          <ListItem button>
            <ListItemText primary={<Link className={classes.link} to='/posts/'>Посты</Link>}/>
          </ListItem>
          {
            userData && userData.isAdmin &&
            <ListItem button>
              <ListItemText primary={<Link className={classes.link} to='/users/?page=1&limit=24'>Люди</Link>}/>
            </ListItem>
          }
          <ListItem button>
            <ListItemText primary={<Link className={classes.link} to='/docs'>Документация</Link>}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={<a className={classes.link} href='https://forms.gle/i8k5iWEYLQevgV1k8' target="blank">Пройти опрос</a>}/>
          </ListItem>
          <Divider />
          {
            <RecursiveTreeView
              open={true}
              handleClose={(res) => {console.log(res)}}
              categoriesData={categories.data}
              isMenu
            />
          }
          <Divider />
          {
            userData && userData.isAdmin &&
            <ListItem button>
              <ListItemText primary={<Link className={classes.link} to='/admin/withdrawal-request'>Запросы на переводы</Link>}/>
            </ListItem>
          }
          {
            userData && userData.isAdmin &&
            <ListItem button>
              <ListItemText primary={<Link className={classes.link} to='/admin/support-list'>Обращения в поддержку</Link>}/>
            </ListItem>
          }
        </List>
      </div>
    );

  return(
    <div>
      <Hidden smUp implementation="css">
      {
          !mobileOpen &&
          <Button
            variant="contained"
            color="primary"
            className={classes.openMenu}
            onClick={handleDrawerToggle}
          >
            {'>'}
          </Button>
      }
       <Drawer
         variant="temporary"
         anchor={theme.direction === 'rtl' ? 'right' : 'left'}
         open={mobileOpen}
         onClose={handleDrawerToggle}
         classes={{
           paper: classes.drawerPaper,
         }}
         ModalProps={{
           keepMounted: true, // Better open performance on mobile.
         }}
       >
         {list(anchor)}
       </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {list(anchor)}
        </Drawer>
      </Hidden>
    </div>
  )
}

Menu.propTypes = {
  getCategories: PropTypes.func,
  categories: PropTypes.shape(),
  auth: PropTypes.shape(),
}

function mapStateToProps(state) {
  const {
    auth,
    categories,
  } = state;
  return {
    auth,
    categories,
  };
}

export default connect(
  mapStateToProps,
  {
    getCategories
  }
)(Menu);
