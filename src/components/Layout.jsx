import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';

export default function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box>
          {children}
        </Box>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
