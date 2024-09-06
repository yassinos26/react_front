import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false); // State to track email validity

  const handleResetPassword = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return;
    }

    // Mock API request for demonstration
    // Replace with actual API call to send reset link
    // Simulate success
    setTimeout(() => {
      setResetSuccess(true);
    }, 1000);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(inputEmail);
    setEmailValid(emailRegex.test(inputEmail));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {!resetSuccess ? (
          <>
            <Typography variant="h4">Reset Password</Typography>
            <TextField
              fullWidth
              label="Email address"
              margin="normal"
              value={email}
              onChange={handleEmailChange} // Handle email change and validate
              error={!emailValid && email.length > 0} // Show error if email is invalid and touched
              helperText={!emailValid && email.length > 0 ? "Invalid email address" : ""}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleResetPassword}
              disabled={!emailValid} // Disable button if email is not valid
            >
              Send Reset Link
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4">Reset Password</Typography>
            <Typography variant="body1">Password reset link has been sent to your email.</Typography>
            <TextField
              fullWidth
              label="New Password"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleResetPassword}>
              Reset Password
            </Button>
          </>
        )}
        <Typography variant="body2" component={Link} to="/signin" sx={{ mt: 2 }}>
          Back to Sign in
        </Typography>
      </Box>
    </Container>
  );
};

export default ResetPassword;
