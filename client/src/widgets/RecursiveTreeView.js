import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const data = {
  id: 'root',
  name: 'Выбрать категорию',
  open: true,
  children: [
    {
      name: 'Спорт',
      id: '1',
      children: [
        {
          name: 'Фудбол',
          id: '11',
          children: [
            {
              name: 'Аглийская премьер лига',
              id: '345353',
              children: [

              ]
            },
            {
              name: 'Российская премьер лига',
              id: '1123',
              children: [

              ]
            },
          ]
        },
        {
          name: 'UFC',
          id: '12',
          children: [

          ]
        },
        {
          name: 'Бокс',
          id: '14',
          children: [

          ]
        },
      ]
    },
    {
      name: 'Кибер спорт',
      id: '2',
      children: [
        {
          name: 'CS GO',
          id: '123123',
          children: [

          ]
        },
        {
          name: 'Лига',
          id: '354467',
          children: [

          ]
        },
        {
          name: 'CS 2',
          id: '34674674535',
          children: [

          ]
        }
      ]
    }
  ]
}


const useStyles = makeStyles({
  root: {
    padding: 20,
    flexGrow: 1,
    maxWidth: 400,
  },
  // selected: {
  //   color: 'red',
  // }
});

function RecursiveTreeView({
  open,
  handleClose,
  getPath
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(['root'])
  const [selectel, setSelectel] = useState(null)
  function onNodeToggle(e, list) {
    setExpanded(list)
  }
  function onNodeSelect(id, end) {
    if (!end) {
      getPath(expanded, id)
    }

  }

  const renderTree = (nodes) => {
    const isHasChildren = Array.isArray(nodes.children);
    const end = isHasChildren && nodes.children.length;
    function click(){
      setSelectel(nodes.id)
      onNodeSelect(nodes.id, !!end)
    }
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        onClick={click}
        // className={clsx('', {
        //   [classes.selected]: selectel === nodes.idCheckIcon
        // })}
      >
        {end ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    )
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        expanded={expanded}
        // onNodeSelect={onNodeSelect}
        onNodeToggle={onNodeToggle}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </Dialog>
  );
}

RecursiveTreeView.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  getPath: PropTypes.func
}

export default RecursiveTreeView
