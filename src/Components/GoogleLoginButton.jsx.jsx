import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log(response); 
    if (response.accessToken) {
      localStorage.setItem('isLoggedIn', 'true'); 
    }
  };

  return (
    <GoogleLogin
      clientId="your-google-client-id"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          {...renderProps}
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: '#db4437',
            color: '#fff',
            py: 2,
            '&:hover': {
              backgroundColor: '#c1351d',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
            borderRadius: (theme) => theme.shape.borderRadius,

            transition: (theme) => theme.transitions.create(['background-color', 'box-shadow']),
          }}
        >
          Continue with Google
        </Button>
      )}
    />
  );
};

export default GoogleLoginButton;