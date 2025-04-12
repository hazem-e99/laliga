import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  Stack,
  Divider,
  Avatar,
  InputAdornment,
  IconButton,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined
} from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/'); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);
      if (res.data.length === 1) {
        const user = res.data[0];
        localStorage.setItem('isLoggedIn', 'true'); 
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful!');
        navigate('/'); 
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };

  const handleGoogleLogin = async (response) => {
    if (response.credential) {
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
      const googleEmail = decodedToken.email;
      const googleName = decodedToken.name;
  
      try {
        const res = await axios.get(`http://localhost:5000/googleUsers?email=${googleEmail}`);
        if (res.data.length > 0) {
          const user = res.data[0];
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
        } else {
          localStorage.setItem('googleTempUser', JSON.stringify({ email: googleEmail, name: googleName }));
          navigate('/complete-google-profile');
        }
      } catch (err) {
        console.error('Google Login Error:', err);
        alert('Something went wrong with Google login');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: `${theme.shape.borderRadius * 2}px`,
            width: '100%',
            maxWidth: 500,
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[10],
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                width: 60, 
                height: 60,
                boxShadow: theme.shadows[4]
              }}
            >
              <LockOutlined fontSize="large" />
            </Avatar>
          </Box>
          
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 4,
              letterSpacing: '-0.5px'
            }}
          >
            Welcome Back
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: `${theme.shape.borderRadius}px`,
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  }
                }}
              />
              
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: `${theme.shape.borderRadius}px`,
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  }
                }}
              />
              
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: `${theme.shape.borderRadius}px`,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[6],
                  }
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 4, mb: 3 }}>
            <Divider 
              sx={{ 
                color: theme.palette.text.secondary,
                '&::before, &::after': {
                  borderColor: theme.palette.divider,
                }
              }}
            >
              OR
            </Divider>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GoogleLogin 
              onSuccess={handleGoogleLogin} 
              onError={() => console.log('Google Login Error')}
              shape="pill"
              theme="filled_blue"
              size="large"
              width="300"
            />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 3,
          }}>
            <Link 
              href="/register" 
              underline="hover" 
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              Don't have an account? Register
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;