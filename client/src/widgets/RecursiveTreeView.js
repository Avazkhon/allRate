import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
  link: {
    color: 'black',
    '&:hover': {
      color: 'black',
      textDecoration: 'none',
    }
  },
});

function RecursiveTreeView({
  getPath,
  categoriesData,
  isMenu,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(['categories'])
  const [selectel, setSelectel] = useState(null)
  function onNodeToggle(e, list) {
    setExpanded(list)
  }
  function onNodeSelect(code, end) {
    if (end && getPath) {
      getPath(expanded, code)
    }

  }

  const renderTree = (nodes) => {
    const isHasChildren = Array.isArray(nodes.children);
    const end = isHasChildren && !nodes.children.length;
    function click(){
      setSelectel(nodes.code)
      onNodeSelect(nodes.code, !!end)
    }

    return (
      <TreeItem
        key={nodes.code}
        nodeId={nodes.code}
        label={(nodes.code !== 'categories') ? <Link className={classes.link} to={`/rate-list${'/'.concat(expanded)}/${nodes.code}`}><span>{nodes.name}</span></Link> : nodes.name }
        onClick={click}
        // className={clsx('', {
        //   [classes.selected]: selectel === nodes.idCheckIcon
        // })}
      >
        {end ? null : nodes.children && nodes.children.map((node) => renderTree(node))}
      </TreeItem>
    )
  };

  return (
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
  );
}

RecursiveTreeView.propTypes = {
  getPath: PropTypes.func,
  categoriesData: PropTypes.shape(),
  isMenu: PropTypes.bool
}

export default RecursiveTreeView
