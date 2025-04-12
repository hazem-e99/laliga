import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Avatar, 
  Grid, 
  Divider,
  Card,
  CardContent,
  Alert,
  Collapse,
  IconButton,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const Profile = () => {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
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

  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = { ...user, ...form };
      const endpoint = user.isGoogleUser ? 
        `http://localhost:5000/googleUsers/${user.id}` : 
        `http://localhost:5000/users/${user.id}`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUserFromServer = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUserFromServer));

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setEditMode(false);
    } catch (error) {
      setError('Error updating profile: ' + error.message);
    }
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

  const handlePasswordUpdate = async () => {
    if (user.isGoogleUser) {
      setError('Google users cannot change password here');
      return;
    }
  
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
  
    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, password: passwordForm.newPassword }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
  
      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      setSuccess('Password updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordEditMode(false);
    } catch (error) {
      setError('Error updating password: ' + error.message);
    }
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

  if (!user) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.primary' }}>
        Please log in first
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setError('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
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
              onClick={() => setSuccess('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>
      </Collapse>

      <Card sx={{ 
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        boxShadow: theme.shadows[10],
        background: theme.palette.background.paper,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`
      }}>
        {/* Header Section with Gradient */}
        <Box sx={{ 
          height: 200, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          position: 'relative'
        }} />
        
        {/* Profile Avatar and Action Buttons */}
        <Box sx={{ 
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          px: { xs: 3, md: 6 },
          mt: -12,
          mb: 4
        }}>
          <Avatar
            sx={{ 
              width: 150, 
              height: 150, 
              border: `4px solid ${theme.palette.background.paper}`,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontSize: '3.5rem',
              fontWeight: 'bold',
              boxShadow: theme.shadows[6]
            }}
          >
            {user.firstName?.charAt(0).toUpperCase()}
          </Avatar>
          
          {/* Action Buttons */}
          {!editMode && !passwordEditMode ? (
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 3, 
              flexWrap: 'wrap', 
              justifyContent: 'flex-end' 
            }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: 4,
                  py: 1.2,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Edit Profile
              </Button>
              
              {!user.isGoogleUser && (
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  onClick={() => setPasswordEditMode(true)}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: `${theme.shape.borderRadius}px`,
                    px: 4,
                    py: 1.2,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Change Password
                </Button>
              )}
            </Box>
          ) : editMode ? (
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
                sx={{
                  textTransform: 'none',
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: 4,
                  py: 1.2,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  textTransform: 'none',
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: 4,
                  py: 1.2,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)'
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
                  textTransform: 'none',
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: 4,
                  py: 1.2,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Update Password
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handlePasswordCancel}
                sx={{
                  textTransform: 'none',
                  borderRadius: `${theme.shape.borderRadius}px`,
                  px: 4,
                  py: 1.2,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        {/* Profile Content */}
        <CardContent sx={{ px: { xs: 3, md: 6 }, pb: 6 }}>
          {passwordEditMode ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  letterSpacing: '-0.5px'
                }}>
                  Change Password
                </Typography>
                <Divider sx={{ 
                  my: 2,
                  borderColor: theme.palette.divider 
                }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type={showPassword.current ? 'text' : 'password'}
                  fullWidth
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword('current')}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPassword.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type={showPassword.new ? 'text' : 'password'}
                  fullWidth
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword('new')}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPassword.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showPassword.confirm ? 'text' : 'password'}
                  fullWidth
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleClickShowPassword('confirm')}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  letterSpacing: '-0.5px'
                }}>
                  Personal Information
                </Typography>
                <Divider sx={{ 
                  my: 2,
                  borderColor: theme.palette.divider 
                }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  value={form.firstName}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                    readOnly: !editMode,
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={form.lastName}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                    readOnly: !editMode,
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  value={form.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                    readOnly: !editMode,
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  value={form.phone}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                    readOnly: !editMode,
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  multiline
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon color="action" />
                      </InputAdornment>
                    ),
                    readOnly: !editMode,
                    sx: {
                      borderRadius: `${theme.shape.borderRadius}px`,
                    }
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;