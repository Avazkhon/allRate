import React from 'react';
import { useClickAway } from "use-click-away";
import { makeStyles } from '@material-ui/core/styles';

import FileCopyRounded from '@material-ui/icons/FileCopyRounded';
import PageviewIcon from '@material-ui/icons/Pageview';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';

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
  const {
    onSelectImageFromAlbums
  } = props;

  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const clickRef = React.useRef("");
  const [message, setMessage] = React.useState('');

  const handleClick = (event) => {
    if (event.currentTarget.name === 'url') {
      navigator.clipboard.writeText(props.src)
       setMessage('url скопирован в буфер');
    }
    if (event.currentTarget.name === 'id') {
      navigator.clipboard.writeText(props.tile.id)
       setMessage('id скопирован в буфер');
    }
    if(event.currentTarget.name === 'select') {
      onSelectImageFromAlbums(props.tile.id)
      setMessage('Изображения выбрано');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  useClickAway(clickRef, () => {
    setModal(false);
  });

  return (
    <div ref={clickRef} className={classes.root}>
      <div onClick={() => setModal(true)}>{props.children}</div>
      {modal && (
        <div className={classes.option}>
          {
            onSelectImageFromAlbums && (
              <fieldset
                onClick={handleClick}
                name="select"
              >
                <PhotoSizeSelectActualIcon
                  className={classes.icon}
                  titleAccess="Кликните для выбора изображения"
                />
              </fieldset>
            )
          }

          <fieldset
            onClick={handleClick}
            name="url"
          >
            <FileCopyRounded
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

          <fieldset>
            <a
              href={props.src}
              target="_blank"
            >
              <PageviewIcon
                className={classes.icon}
                titleAccess="Кликните для просмотра"
              />
            </a>
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