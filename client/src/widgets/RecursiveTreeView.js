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
  getPath,
  categoriesData,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(['Категории'])
  const [selectel, setSelectel] = useState(null)
  function onNodeToggle(e, list) {
    setExpanded(list)
  }
  function onNodeSelect(_id, end) {
    if (!end) {
      getPath(expanded, _id)
    }

  }

  const renderTree = (nodes) => {
    const isHasChildren = Array.isArray(nodes.children);
    const end = isHasChildren && nodes.children.length;
    function click(){
      setSelectel(nodes._id)
      onNodeSelect(nodes._id, !!end)
    }
    return (
      <TreeItem
        key={nodes._id}
        nodeId={nodes._id}
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
        {renderTree(categoriesData)}
      </TreeView>
    </Dialog>
  );
}

RecursiveTreeView.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  getPath: PropTypes.func,
  categoriesData: PropTypes.shape()
}

export default RecursiveTreeView
