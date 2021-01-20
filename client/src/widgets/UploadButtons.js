import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function UploadButtons({ uploadFile, id, inputProps = {}}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input
        accept=".jpg, .jpeg, .png"
        className={classes.input}
        id={id}
        onChange={uploadFile}
        type="file"
        data-id={inputProps['data-id']}
      />
      <label htmlFor={id}>
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}
UploadButtons.propTypes = {
  uploadFile: PropTypes.func,
  inputProps: PropTypes.shape(),
  id: PropTypes.number
}
export default UploadButtons
