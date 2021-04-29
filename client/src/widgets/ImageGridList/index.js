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
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList({ tileData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div cellHeight={160} className={classes.imageList} cols={3}>
        {tileData.map((tile) => (
          <div key={tile._id} cols={tile.cols || 1}>
            <img src={`/media/image/${tile.id}?resize=300`} alt={tile.name} />
          </div>
        ))}
      </div>
    </div>
  );
}