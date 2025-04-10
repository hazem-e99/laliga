import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // إرسال طلب إلى السيرفر للمطالبة بإرسال إيميل Reset Password
      const response = await axios.post('http://localhost:5000/reset-password', { email });
      setMessage(response.data.message); // تحديث الرسالة للمستخدم
    } catch (error) {
      setMessage('Error sending reset email!');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Reset Your Password
      </Typography>
      <form onSubmit={handleResetPassword}>
        <TextField
          label="Enter your email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send Reset Email
        </Button>
      </form>
      {message && (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ResetPassword;
