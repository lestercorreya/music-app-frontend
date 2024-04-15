// Code adapted from material UI Log In example template
// https://github.com/mui/material-ui/tree/v5.15.15/docs/data/material/getting-started/templates/sign-in-side

'use client'

import React, { useState } from 'react';
import { Typography, Avatar, Button, CssBaseline, TextField, Paper, LinearProgress, Box, Grid, InputAdornment, IconButton, Alert, Snackbar } from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup
    .string()
    .min(3, 'Username should be atleast 3 characters long')
    .required("Username is required"),
  password: yup
    .string()
    .min(3, 'Password should be atleast 3 characters long')
    .required('Password is required'),
});

export default function SignUpPage() {

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const requestData = {
        email: values.email,
        password: values.password,
        username: values.username
      }

      axios.post("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/addUser", requestData)
        .then((res) => {
          setOpenAlert(true)
          setAlertMessage(res.data.message)

          setTimeout(() => {
            router.push("/")
          }, 500)
        })
        .catch((err) => {
          setOpenAlert(true)
          setAlertMessage(err.response.data.message)
          console.log(err)
        })
    },
  });

  const handlePasswordVisibilityClick = () => {
    setShowPassword(!showPassword);
  }

  if (loading) {
    return (
      <Grid container component="main" sx={{ height: '100vh', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <CssBaseline />
        <LinearProgress color="inherit" sx={{ width: "500px" }} />
        <LinearProgress color="inherit" sx={{ width: "500px", mt: 2 }} />
        <LinearProgress color="inherit" sx={{ width: "500px", mt: 2 }} />
      </Grid >
    )
  } else {

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
              Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                autoFocus
              />
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                margin="normal"
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
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
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/">
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
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
}