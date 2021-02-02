import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function AlertDialogSlide (
  {
    isOpen = false,
    title,
    description,
    type,
    setAlertDate,
  }
) {

  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    setOpen(isOpen)
  }, isOpen)

  const handleClose = () => {
    setOpen(false)
    setAlertDate({})
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText color={type} id="alert-dialog-slide-description">
            { description }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  setAlertDate:  PropTypes.func,
}


export default AlertDialogSlide;
