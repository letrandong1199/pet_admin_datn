import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import PostService from "../../services/post.service";
import { useEffect, useState } from "react";
export const AllowedPost = (props) => {
  const [ratio, setRatio] = useState("...");
  useEffect(() => {
    PostService.getSummary()
      .then((data) => {
        setTotalPost((data.total_allowed_post / data.total_post) * 100);
      })
      .catch((error) => {
        console.log(error.message);
      });
    return () => {};
  }, []);
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              ALLOWED POST
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {ratio}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={ratio} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
