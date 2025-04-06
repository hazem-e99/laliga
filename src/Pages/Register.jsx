import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
  Paper,
  Divider,
  InputAdornment,
  Avatar,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Person,
  Email,
  Lock,
  Phone,
  Cake,
  Home,
  HowToReg
} from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
    address: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.acceptTerms) {
      return alert('Please accept the terms and conditions.');
    }

    try {
      const { data: users } = await axios.get('http://localhost:5000/users');
      const userExists = users.find((user) => user.email === form.email);

      if (userExists) {
        alert('User already exists!');
      } else {
        await axios.post('http://localhost:5000/users', form);
        alert('Registered successfully!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 4,
        mb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Paper elevation={6} sx={{ 
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          width: '100%',
          maxWidth: 800,
          background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar sx={{ 
              bgcolor: 'primary.main',
              width: 64,
              height: 64,
              mb: 2
            }}>
              <HowToReg sx={{ fontSize: 32 }} />
            </Avatar>
          </Box>
          
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            mb: 4
          }}>
            Create Your Account
          </Typography>

          <form onSubmit={handleRegister}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Stack>

              <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                required
                value={form.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                required
                value={form.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  name="birthDate"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={form.birthDate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  label="Gender"
                  name="gender"
                  fullWidth
                  required
                  select
                  value={form.gender}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Stack>

              <TextField
                label="Address"
                name="address"
                fullWidth
                multiline
                rows={2}
                value={form.address}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={form.acceptTerms}
                    onChange={handleChange}
                    required
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the <Link href="/terms" underline="hover">Terms and Conditions</Link>
                  </Typography>
                }
                sx={{ mt: 1 }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                fullWidth
                sx={{
                  py: 1.8,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #4338ca, #6d28d9)',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                  }
                }}
              >
                Create Account
              </Button>

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                </Typography>
              </Divider>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <Link href="/login" underline="hover" fontWeight="500">
                  Sign In
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
