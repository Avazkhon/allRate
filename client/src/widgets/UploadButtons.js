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

function UploadButtons({uploadFile}) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <input
        accept=".jpg, .jpeg, .png"
        className={classes.input}
        id="contained-button-file"
        onChange={uploadFile}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}
UploadButtons.propTypes = {
  uploadFile: PropTypes.func.isReqred
}
export default UploadButtons
