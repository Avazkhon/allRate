import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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

import RecursiveTreeView from 'widgets/RecursiveTreeView';

import {
  getCategories,
} from 'actions'



const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Menu({
  getCategories,
  categories
}) {
  const classes = useStyles();
  // const [categoriesData, setCategoriesData ] = useState({})

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

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {
            // ['All mail', 'Trash', 'Spam'].map((text, index) => (
            //   <ListItem button key={text}>
            //     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            //     <ListItemText primary={text} />
            //   </ListItem>
            // ))
          }
          {
            <RecursiveTreeView
              open={true}
              handleClose={(res) => {console.log(res)}}
              getPath={(res) => {console.log(res)}}
              categoriesData={categories.data}
            />
          }
        </List>
      </div>
    );

  return(
    <div>
      <Button onClick={toggleDrawer}>Menu</Button>
      <Drawer anchor={anchor} open={show} onClose={toggleDrawer}>
        {list(anchor)}
      </Drawer>
    </div>
  )
}

Menu.propTypes = {
  getCategories: PropTypes.func,
  categories: PropTypes.shape(),
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
