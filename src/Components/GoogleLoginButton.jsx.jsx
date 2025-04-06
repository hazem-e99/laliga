// GoogleLoginButton.jsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@mui/material';

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
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          {...renderProps}
          variant="contained"
          sx={{
            backgroundColor: '#db4437',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#c1351d',
            },
          }}
        >
          Login with Google
        </Button>
      )}
    />
  );
};

export default GoogleLoginButton;
