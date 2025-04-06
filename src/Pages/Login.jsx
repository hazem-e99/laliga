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
  IconButton
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
        console.log('User logged in, localStorage isLoggedIn:', localStorage.getItem('isLoggedIn'));
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
          // المستخدم موجود، سجله دخول
          const user = res.data[0];
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
        } else {
          // المستخدم مش موجود، خليه يكمّل بياناته
          localStorage.setItem('googleTempUser', JSON.stringify({ email: googleEmail, name: googleName }));
          navigate('/complete-google-profile');
        }
      } catch (err) {
        console.error('Google Login Error:', err);
        alert('Something went wrong with Google login');
      }
    } else {
      console.log('Google Login Failed');
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
            borderRadius: 3,
            width: '100%',
            maxWidth: 500,
            background: 'linear-gradient(to bottom right, #f5f7fa, #e4e8f0)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#3f51b5', width: 56, height: 56 }}>
              <LockOutlined fontSize="large" />
            </Avatar>
          </Box>
          
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: '#2d3748',
              mb: 3
            }}
          >
            Welcome Back ..
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
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#cbd5e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a5568',
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
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#cbd5e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a5568',
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
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #4338ca, #6d28d9)',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                  }
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, mb: 2 }}>
            <Divider sx={{ color: '#a0aec0' }}>OR</Divider>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GoogleLogin 
              onSuccess={handleGoogleLogin} 
              onError={() => console.log('Google Login Error')}
              shape="pill"
              theme="filled_blue"
              size="large"
            />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 2,
            color: '#4a5568'
          }}>
            <Link 
              href="/register" 
              underline="hover" 
              variant="body2"
              sx={{
                color: '#4a5568',
                '&:hover': {
                  color: '#2d3748',
                  fontWeight: 500
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