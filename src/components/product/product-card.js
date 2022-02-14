import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, ImageListItem } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import FormDialog from 'src/components/product/product-detail';
import { BsFillPersonFill, BsHeartFill } from 'react-icons/bs'
import React, { useState } from 'react';

export const ProductCard = ({ post, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [isAlert, setIsAlert] = React.useState(false);

  const handleClick = (post) => {
    setOpen(true);
    setPostDetail(post);
  }

  const handleClose = () => {
    setOpen(false);
    setIsAlert(false);
  }
  console.log(postDetail)
  return (
    <React.Fragment>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        onClick={() => handleClick(post)}
        {...rest}
      >
        <CardContent>
          <Box style={{ height: '80%' }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >
            <img
              style={{ objectFit: 'contain', width: '100%' }}
              src={`${post.media_url}`}
              loading="lazy"
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
            noWrap={true}
            style={{ height: '20%' }}
          >
            {post.caption}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <BsFillPersonFill color='#6B7280'
                size={25} />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {`${post.User?.last_name}`}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <BsHeartFill
                color='#6B7280'
                size={25} />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {`${post.upvote}`}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <FormDialog
        open={open}
        post={postDetail}
        handleClose={handleClose}
        setIsAlert={setIsAlert}
        isAlert={isAlert} />
    </React.Fragment>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
