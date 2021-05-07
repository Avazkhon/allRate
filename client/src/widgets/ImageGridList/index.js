import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import { OptionImage } from './OptionImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  imageItem: {
    margin: '8px',
    '& img': {
      borderRadius: 4
    }
  },
}));


export default function ImageGridList({ tileData, onSelectImageFromAlbums }) {
  const classes = useStyles();

  function geSrc(id) {
    const resize = '?resize=300x200';
    const src = `/media/image/${id}`
    return { fullSrc: src + resize, src }
  }

  function getProtocolAndDomain() {
    if (typeof location !== 'undefined') {
      return `${location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.imageList}>
        {
          tileData.map((tile) => {
            const { fullSrc, src } = geSrc(tile.id);
            const url = getProtocolAndDomain();
            return (
              <div key={tile._id} className={classes.imageItem}>
                <OptionImage tile={tile} src={url + src} onSelectImageFromAlbums={onSelectImageFromAlbums}>
                  <img src={fullSrc} alt={tile.name || tile} />
                </OptionImage>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}