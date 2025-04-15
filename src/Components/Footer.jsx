import React from 'react';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e1e2f',
        color: '#fff',
        py: 3,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} - All rights reserved
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#fff' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#fff' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#fff' }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
