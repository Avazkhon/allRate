import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

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
    flexWrap: 'wrap',
  },
  imageItem: {
    margin: '8px',
    '& img': {
      borderRadius: 4,
    },
  },
  // img: {
  //   width: '100%',
  // },
}));

export default function ImageGridList({ tileData, onSelectImageFromAlbums }) {
  const classes = useStyles();

  function geSrc(id) {
    // const resize = '?resize=300x200';
    const src = `/media/image/${id}`;
    return { fullSrc: src, src };
  }

  function getProtocolAndDomain() {
    if (typeof location !== 'undefined') {
      return `${location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`;
    }
  }

  const newTileData = useMemo(() => {
    return tileData.reduceRight((accumulator, value) => {
      accumulator.push(value); // почемуто не работает обычный revesw
      return accumulator;
    }, []);
  }, [tileData]);

  return (
    <div className={classes.root}>
      <div className={classes.imageList}>
        {newTileData.map((tile) => {
          const { fullSrc, src } = geSrc(tile.id);
          const url = getProtocolAndDomain();
          return (
            <div key={tile._id} className={classes.imageItem}>
              <OptionImage
                tile={tile}
                src={url + src}
                onSelectImageFromAlbums={onSelectImageFromAlbums}
              >
                {/* <img
                  src={fullSrc}
                  alt={tile.name || tile}
                  className={classes.img}
                /> */}
                <CardMedia
                  component="img"
                  height="300"
                  width="300"
                  image={fullSrc}
                  // className={classes.img}
                  alt={tile.name || tile}
                />
              </OptionImage>
            </div>
          );
        })}
      </div>
    </div>
  );
}
