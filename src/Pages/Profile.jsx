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
  InputAdornment
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
import { useTranslation } from 'react-i18next';
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { t, i18n } = useTranslation();
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
      <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.primary' }}>
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

      setSuccess( t('profileSuccess'));
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
  
      setSuccess(t('passwordSuccess'));
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
              onClick={() => setSuccess('')}
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
        boxShadow: 3,
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #e4e8f0 100%)',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          height: 180, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative'
        }} />
        
        <Box sx={{ 
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          px: { xs: 3, md: 6 },
          mt: -10,
          mb: 4
        }}>
          <Avatar
            sx={{ 
              width: 140, 
              height: 140, 
              border: '4px solid white',
              bgcolor: 'primary.main',
              color: 'white',
              fontSize: '3.5rem',
              fontWeight: 'bold',
              boxShadow: 3
            }}
          >
            {user.firstName?.charAt(0).toUpperCase()}
          </Avatar>
          
          {!editMode && !passwordEditMode ? (
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                   {t('editProfile')}
          
              </Button>
              
              {/* زر تغيير كلمة المرور - يظهر فقط للمستخدمين العاديين */}
              {!user.isGoogleUser && (
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  onClick={() => setPasswordEditMode(true)}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                    py: 1
                  }}
                >
                     {t('changePassword')}
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
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                   {t('saveChanges')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                  {t('cancel')}
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
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                   {t('updatePassword')}
                
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handlePasswordCancel}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                   {t('cancel')}
               
              </Button>
            </Box>
          )}
        </Box>

        <CardContent sx={{ px: { xs: 3, md: 6 }, pb: 6 }}>
          {passwordEditMode ? (
            <Grid container spacing={3}>
              <Grid  xs={12}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  
                  {t('changePassword')}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid  xs={12} md={6}>
                <TextField
                  label=   {t('currentPassword')}
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
                        >
                          {showPassword.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  label=   {t('newPassword')}
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
                        >
                          {showPassword.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  label=   {t('confirmPassword')}
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
                        >
                          {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid  xs={12}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                 
                  {t('personalInfo')}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
              
              <Grid  xs={12} md={6}>
                <TextField
                  label=   {t('firstName')}
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
                    readOnly: !editMode
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label=   {t('lastName')}
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
                    readOnly: !editMode
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label=   {t('email')}
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
                    readOnly: !editMode
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label=   {t('phone')}
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
                    readOnly: !editMode
                  }}
                  variant={editMode ? 'outlined' : 'filled'}
                />
                <TextField
                  label=   {t('address')}
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
                    readOnly: !editMode
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