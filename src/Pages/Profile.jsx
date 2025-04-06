import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Avatar, 
  Grid, 
  Divider,
  Card,
  CardContent,
  Alert,
  Collapse,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4, color: 'white' }}>
        Please log in first
      </Typography>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    localStorage.setItem('user', JSON.stringify(form));
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
    setEditMode(false);
  };

  const handlePasswordUpdate = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordForm.currentPassword !== user.password) {
      setError('Current password is incorrect');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const updatedUser = { ...user, password: passwordForm.newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setSuccess('Password updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordEditMode(false);
  };

  const handlePasswordCancel = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setPasswordEditMode(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#1e1e2f', minHeight: '100vh' }}>
      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError('');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Collapse>
      
      <Collapse in={!!success}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess('');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      </Collapse>

      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        backgroundColor: '#2a2a3d'
      }}>
        <Box sx={{ 
          height: 180, 
          backgroundColor: '#3a3a5d',
          position: 'relative',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }} />
        
        <Box sx={{ 
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          px: 6,
          mt: -10,
          mb: 4
        }}>
          <Avatar
            sx={{ 
              width: 140, 
              height: 140, 
              border: '4px solid #2a2a3d',
              bgcolor: '#90caf9',
              color: '#1e1e2f',
              fontSize: '3.5rem',
              fontWeight: 'bold'
            }}
          >
            {user.firstName?.charAt(0).toUpperCase()}
          </Avatar>
          
          {!editMode && !passwordEditMode ? (
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{ 
                  backgroundColor: '#90caf9',
                  color: '#1e1e2f',
                  '&:hover': {
                    backgroundColor: '#64b5f6'
                  }
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setPasswordEditMode(true)}
                sx={{ 
                  color: '#90caf9',
                  borderColor: '#90caf9',
                  '&:hover': {
                    borderColor: '#64b5f6'
                  }
                }}
              >
                Change Password
              </Button>
            </Box>
          ) : editMode ? (
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
                sx={{
                  backgroundColor: '#81c784',
                  '&:hover': {
                    backgroundColor: '#66bb6a'
                  }
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  color: '#e57373',
                  borderColor: '#e57373',
                  '&:hover': {
                    borderColor: '#ef5350'
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handlePasswordUpdate}
                sx={{
                  backgroundColor: '#81c784',
                  '&:hover': {
                    backgroundColor: '#66bb6a'
                  }
                }}
              >
                Save Password
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handlePasswordCancel}
                sx={{
                  color: '#e57373',
                  borderColor: '#e57373',
                  '&:hover': {
                    borderColor: '#ef5350'
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        <CardContent sx={{ px: 6, pb: 6 }}>
          {passwordEditMode ? (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Change Password
                </Typography>
                <Divider sx={{ 
                  my: 2,
                  backgroundColor: '#3a3a5d'
                }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  fullWidth
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: {
                      color: 'white',
                      fontSize: '1.1rem'
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#a0a0a0'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  fullWidth
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: {
                      color: 'white',
                      fontSize: '1.1rem'
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#a0a0a0'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  fullWidth
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    style: {
                      color: 'white',
                      fontSize: '1.1rem'
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#a0a0a0'
                    }
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                {editMode ? (
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={form.firstName}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                    InputProps={{
                      style: {
                        color: 'white',
                        fontSize: '1.1rem'
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#a0a0a0'
                      }
                    }}
                  />
                ) : (
                  <ProfileField 
                    label="First Name" 
                    value={user.firstName}
                  />
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {editMode ? (
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={form.lastName}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                    InputProps={{
                      style: {
                        color: 'white',
                        fontSize: '1.1rem'
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#a0a0a0'
                      }
                    }}
                  />
                ) : (
                  <ProfileField 
                    label="Last Name" 
                    value={user.lastName}
                  />
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ 
                  my: 3,
                  backgroundColor: '#3a3a5d'
                }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                {editMode ? (
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    value={form.email}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                    InputProps={{
                      style: {
                        color: 'white',
                        fontSize: '1.1rem'
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#a0a0a0'
                      }
                    }}
                  />
                ) : (
                  <ProfileField 
                    label="Email" 
                    value={user.email}
                  />
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {editMode ? (
                  <TextField
                    label="Phone"
                    name="phone"
                    fullWidth
                    value={form.phone}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                    InputProps={{
                      style: {
                        color: 'white',
                        fontSize: '1.1rem'
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#a0a0a0'
                      }
                    }}
                  />
                ) : (
                  <ProfileField 
                    label="Phone" 
                    value={user.phone || 'Not specified'}
                  />
                )}
              </Grid>
              
              <Grid item xs={12}>
                {editMode ? (
                  <TextField
                    label="Address"
                    name="address"
                    fullWidth
                    multiline
                    rows={4}
                    value={form.address}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    InputProps={{
                      style: {
                        color: 'white',
                        fontSize: '1.1rem'
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#a0a0a0'
                      }
                    }}
                  />
                ) : (
                  <ProfileField 
                    label="Address" 
                    value={user.address || 'Not specified'}
                    multiline
                  />
                )}
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

const ProfileField = ({ label, value, multiline = false }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: '#3a3a5d',
        minHeight: multiline ? 100 : 'auto',
        backgroundColor: '#2a2a3d'
      }}
    >
      <Typography variant="caption" color="#a0a0a0" sx={{ mb: 2, display: 'block', fontSize: '0.9rem' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ 
        whiteSpace: 'pre-line',
        color: 'white',
        fontSize: '1.1rem'
      }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default Profile;