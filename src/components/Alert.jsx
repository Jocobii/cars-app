import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function MyAlert({ error, message }) {
  return (
    <Alert severity={error ? 'error' : 'success'}>
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

MyAlert.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default MyAlert;
