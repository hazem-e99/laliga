import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        py: 3,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 300 }}>
        © 2025 My Shop. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
