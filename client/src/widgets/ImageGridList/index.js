import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  imageOptions: {
    display: 'none',
  }
}));

export default function ImageGridList({ tileData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageList}>
        {tileData.map((tile) => (
          <div key={tile._id} className={classes.imageItem}>
            <img src={`/media/image/${tile.id}?resize=300x200`} alt={tile.name} />
            <div className={classes.imageOptions}></div>
          </div>
        ))}
      </div>
    </div>
  );
}