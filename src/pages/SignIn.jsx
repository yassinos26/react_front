import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSignIn = () => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleCloseError = () => setError('');

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
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <Typography variant="h4">Sign In</Typography>
          <Typography variant="body2" component={Link} to="/sign-up" sx={{ mt: 1, mb: 3 }}>
            Don't have an account? Sign Up
          </Typography>
          <TextField
            fullWidth
            label="Email address"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.includes('email')}
            helperText={error.includes('email') && error}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={error.includes('password')}
            helperText={error.includes('password') && error}
          />
          <Typography variant="body2" component={Link} to="/reset-password" sx={{ mt: 1, mb: 3 }}>
            Forgot password?
          </Typography>
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSignIn}>
            Sign In
          </Button>

          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={handleCloseError}
            message={error}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default SignIn;
