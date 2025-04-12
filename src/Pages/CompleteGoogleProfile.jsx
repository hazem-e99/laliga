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
        isGoogleUser: true // إضافة علامة تمييز
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
      <Box sx={{ mt: 8 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Complete Your Profile
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                name="phone"
                label="Phone Number"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formData.email}
                disabled
              />
              <TextField
                name="address"
                label="Address"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CompleteGoogleProfile;
