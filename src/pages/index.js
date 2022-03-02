import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { useAuth } from '../app/authContext';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [validated, setValidated] = useState(false);
  const { isAuthenticated, loading, login } = useAuth();
  if (isAuthenticated) {
    router.replace('/dashboard');
  }
  const handleLogin = async (e) => {
    const email = username;
    if (email) {
      console.log(email);
      login(email);
    }
  }
}
const handleChangeUsername = (e) => {
  setUsername(e.target.value);
}

return (
  <>
    <Head>
      <title>Login | Pet-Friends Social</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={handleLogin}>
          <Box sx={{ my: 3 }}>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Sign in
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Sign in with admin account
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
          >
          </Grid>
          <TextField
            // error={!validated}
            fullWidth
            // helperText={formik.touched.email && formik.errors.email}
            label={"Email Address"}
            margin="normal"
            name="email"
            // onBlur={formik.handleBlur}
            onChange={handleChangeUsername}
            type="email"
            value={username}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              // disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  </>
);
};

export default Login;
