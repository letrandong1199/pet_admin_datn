import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState, useEffect } from 'react';
import userService from 'src/services/user.service';
const Customers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then(response => {
      const listUsers = response;
      if (listUsers.length !== 0) {
        setUsers([...users, ...listUsers])
      }
    }).catch(e => {
      console.log(e)
    });
  }, [])
  return (
    <>
      <Head>
        <title>
          Users | Pet-Friends Social
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults users={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>);

export default Customers;
