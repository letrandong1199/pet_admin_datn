import { useState } from "react";
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";

export const AccountProfileDetails = (props) => {
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                helperText="Please specify the first name"
                placeholder="First name"
                name="firstName"
                required
                value={props.user?.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                placeholder="Last name"
                name="lastName"
                required
                value={props.user?.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                placeholder="Email"
                name="email"
                required
                value={props.user?.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                placeholder="Phone Number"
                name="phone"
                type="number"
                value={props.user?.phone_number}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                placeholder="Country"
                name="country"
                required
                value={props.user?.country_code}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
