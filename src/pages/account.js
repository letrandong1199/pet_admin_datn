import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import userService from '../services/user.service';
const Account = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getMyInfo = async () => {
      let info = await userService.getInfo();
      if (info) {
        setUser(info);
      }
    }
    getMyInfo();
  }, [])
  return (
    <>
      <Head>
        <title>
          Account | Pet-Friends Social
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Account
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile user={user} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
