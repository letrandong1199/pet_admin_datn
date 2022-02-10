import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import postService from 'src/services/post.service';
import { useState, useEffect } from 'react';
const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState({});
  const handleChangePage = (e, value) => {
    e.preventDefault();
    setCurrentPage(value)
  }
  console.log('currentPage', currentPage);
  useEffect(() => {
    const getPosts = () => {
      postService.getAll(currentPage).then(response => {
        const listPosts = response;
        setPosts({ ...posts, currentPage: listPosts })
      }).catch(console.error());
    }
    getPosts();
  }, [currentPage])


  return (
    <>
      <Head>
        <title>
          Products | Material Kit
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
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {posts.currentPage?.map((post) => (
                <Grid
                  item
                  key={post.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              page={currentPage}
              size="small"
              onChange={handleChangePage}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
