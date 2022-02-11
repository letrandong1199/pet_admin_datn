import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, ImageListItem } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import FormDialog from 'src/components/product/product-detail';
import { BsEyeFill } from 'react-icons/bs'
import React, { useState } from 'react';

export const ProductCard = ({ post, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const handleClick = (post) => {
    setOpen(true);
    setPostDetail(post);
  }

  const handleClose = () => {
    setOpen(false);
  }

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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >
            <img
              src={`${post.media_url}`}
              loading="lazy"
            />
          </Box>
          {/* <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
        noWrap={true}
      >
        {post.caption}
      </Typography> */}
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
            noWrap={true}
          >
            {'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'}
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
              <ClockIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {`Created ${post.created_at}`}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <BsEyeFill
                color='#6B7280'
                size={25} />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <FormDialog
        open={open}
        post={postDetail}
        handleClose={handleClose} />
    </React.Fragment>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
