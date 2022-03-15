import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalPost } from "../components/dashboard/total-post";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { AllowedPost } from "../components/dashboard/allowed-post-ratio";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalTransaction } from "../components/dashboard/total-transaction";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";

const Dashboard = () => (
  <>
    <Head>
      <title>Dashboard | Pet-Friends Social</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalPost />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <AllowedPost />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalTransaction sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
