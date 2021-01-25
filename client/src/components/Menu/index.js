import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Hidden from '@material-ui/core/Hidden';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import RecursiveTreeView from 'widgets/RecursiveTreeView';

import {
  getCategories,
} from 'actions'



const useStyles = makeStyles((theme) => {
  const drawerWidth = '250px';
  return ({
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
    opneMenu: {
      position: 'fixed',
      zIndex: 1300
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
        <Divider />
        <List>
          {
            mobileOpen &&
            <ListItem button>
              <ListItemText onClick={handleDrawerToggle} primary={'Menu - Закрыть'}/>
            </ListItem>
          }
          {
            userData && userData._id &&
            <ListItem button>
              <ListItemText primary={<Link to='/create-rate'>Создать ставку</Link>}/>
            </ListItem>
          }
          {
            userData && userData.isAdmin &&
            <ListItem button>
              <ListItemText primary={<Link to='/admin/withdrawal-request'>Запросы на переводы</Link>}/>
            </ListItem>
          }
          <ListItem button>
            <ListItemText primary={<Link to='/rate-list?page=1&limit=24'>Список ставок</Link>}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={<Link to='/posts/'>Посты</Link>}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary={<Link to='/users/?page=1&limit=24'>Люди</Link>}/>
          </ListItem>
          {
            <RecursiveTreeView
              open={true}
              handleClose={(res) => {console.log(res)}}
              categoriesData={categories.data}
              isMenu
            />
          }
        </List>
      </div>
    );

  return(
    <div className={classes.root}>
      <Hidden smUp implementation="css">
      {
          !mobileOpen &&
          <Button variant="contained" color="primary" className={classes.opneMenu}onClick={handleDrawerToggle}>{'->'}</Button>
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
