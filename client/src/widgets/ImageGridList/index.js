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
  },
}));

export default function ImageGridList({ tileData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageList}>
        {tileData.map((tile) => (
          <div key={tile._id} className={classes.imageItem}>
            <OptionImage tile={tile}>
              <img src={`/media/image/${tile.id}?resize=300x200`} alt={tile} />
            </OptionImage>
          </div>
        ))}
      </div>
    </div>
  );
}