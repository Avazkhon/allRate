import React from 'react';
import { useClickAway } from "use-click-away";
import { makeStyles } from '@material-ui/core/styles';

import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import FileCopyRounded from '@material-ui/icons/FileCopyRounded';
import EditRounded from '@material-ui/icons/EditRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  option: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    cursor: 'pointer'
  }
}));


export const OptionImage = (props) => {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const clickRef = React.useRef("");

  useClickAway(clickRef, () => {
    setModal(false);
  });
  return (
    <div ref={clickRef} className={classes.root}>
      <div onClick={() => setModal(true)}>{props.children}</div>
      {modal && (
        <div className={classes.option}>
          <FileCopyOutlined
            className={classes.icon}
            onClick={() => {navigator.clipboard.writeText(props.tile.id)}}
            titleAccess="Кликните для копирования id"
          />
          <FileCopyRounded
            className={classes.icon}
            onClick={() => {navigator.clipboard.writeText(props.tile.name)}}
            titleAccess="Кликните для копирования названия"
          />
          <EditRounded className={classes.icon} />
          <DeleteOutlineOutlined className={classes.icon} />
        </div>
      )
      }
    </div>
  )
}