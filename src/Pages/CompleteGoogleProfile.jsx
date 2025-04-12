import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompleteGoogleProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem('googleTempUser'));
    if (tempUser) {
      setFormData((prev) => ({
        ...prev,
        firstName: tempUser.firstName || '',
        lastName: tempUser.lastName || '',
        email: tempUser.email || ''
      }));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/googleUsers', {
        ...formData,
        isGoogleUser: true
      });
      localStorage.removeItem('googleTempUser');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      console.error('Error saving Google user:', error);
      alert('Something went wrong while saving your data.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Paper elevation={6} sx={{ 
          p: 4, 
          width: '100%',
          borderRadius: (theme) => theme.shape.borderRadius * 2,
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: (theme) => theme.shadows[4]
        }}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              mb: 3
            }}
          >
            Complete Your Profile
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }
                }}
              />
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }
                }}
              />
              <TextField
                name="phone"
                label="Phone Number"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }
                }}
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formData.email}
                disabled
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: (theme) => theme.shape.borderRadius,
                  },
                  '& .Mui-disabled': {
                    backgroundColor: (theme) => theme.palette.action.disabledBackground,
                  }
                }}
              />
              <TextField
                name="address"
                label="Address"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 2,
                  borderRadius: (theme) => theme.shape.borderRadius,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    boxShadow: (theme) => theme.shadows[4],
                    backgroundColor: 'primary.dark'
                  }
                }}
              >
                Complete Registration
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CompleteGoogleProfile;