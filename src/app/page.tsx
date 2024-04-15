'use client'

import React, { useState } from 'react';
import { Typography, Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/navigation';

export default function LogInPage() {

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const requestData = {
      email: data.get("email"),
      password: data.get("password")
    }

    axios.post("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/loginUser", requestData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token)
        router.push("/home")
      })
      .catch((err) => {
        setOpenAlert(true)
        setAlertMessage(err.response.data.message)
        console.log(err)
      })
  };

  const handlePasswordVisibilityClick = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibilityClick}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
