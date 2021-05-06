import React from 'react';
import { useClickAway } from "use-click-away";
import { makeStyles } from '@material-ui/core/styles';

import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FileCopyRounded from '@material-ui/icons/FileCopyRounded';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  option: {
    position: 'absolute',
    background: 'rgba(205,206,255,0.5)',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  icon: {
    cursor: 'pointer',
    marginRight: '8px',
  },
  snackbar: {
    borderRadius: 4
  }
}));

export const OptionImage = (props) => {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const clickRef = React.useRef("");
  const [message, setMessage] = React.useState('');

  const handleClick = (event) => {
    if (event.currentTarget.name === 'url') {
      navigator.clipboard.writeText(
        `${protocolAndDomain}${props.src}`
      )
       setMessage('url скопирован в буфер');
    }
    if (event.currentTarget.name === 'id') {
      navigator.clipboard.writeText(props.tile.id)
       setMessage('id скопирован в буфер');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  useClickAway(clickRef, () => {
    setModal(false);
  });
  const protocolAndDomain = `${location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`
  return (
    <div ref={clickRef} className={classes.root}>
      <div onClick={() => setModal(true)}>{props.children}</div>
      {modal && (
        <div className={classes.option}>
          <fieldset
            onClick={handleClick}
            name="url"
          >
            <FileCopyOutlined
              className={classes.icon}

              titleAccess="Кликните для копирования url"
            />
          </fieldset>
          <fieldset
            onClick={handleClick}
            name="id"
          >
            <FileCopyRounded
              className={classes.icon}
              titleAccess="Кликните для копирования id"
            />
          </fieldset>
          <Snackbar
            className={classes.snackbar}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={!!message}
            message={message}
          />
        </div>
      )
      }
    </div>
  )
}