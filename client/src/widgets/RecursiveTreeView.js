import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    padding: 20,
    flexGrow: 1,
  },
  MuiTreeItem: {
    margin: '10px',
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
  handleSelectCategories,
  categoriesData,
  isMenu,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(['bets', 'sport', 'cybersport', 'TV'])
  function onNodeToggle(e, list) {
    setExpanded(list)
  }

  const renderTree = (nodes, url = '', categories = {}) => {
    const isHasChildren = Array.isArray(nodes.children);
    const end = isHasChildren && !nodes.children.length;
    url += `/${nodes.code}`

    categories[nodes.type] = nodes.code;
    function click(){
      !isMenu && handleSelectCategories(categories)
    }

    return (
      <TreeItem
        className={classes.MuiTreeItem}
        key={nodes.code}
        nodeId={nodes.code}
        label={(nodes.code !== 'bets' && isMenu) ? <Link className={classes.link} to={url}><span>{nodes.name}</span></Link> : nodes.name}
        onClick={click}
      >
        {end ? null : nodes.children && nodes.children.map((node) => renderTree(node, url, Object.assign({}, categories)))}
      </TreeItem>
    )
  };

  return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        expanded={expanded}
        onNodeToggle={onNodeToggle}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {categoriesData?.code && renderTree(categoriesData)}
      </TreeView>
  );
}

RecursiveTreeView.propTypes = {
  handleSelectCategories: PropTypes.func,
  categoriesData: PropTypes.shape(),
  isMenu: PropTypes.bool
}

export default RecursiveTreeView
