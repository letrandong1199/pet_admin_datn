import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import postService from 'src/services/post.service';
import { useState, useEffect } from 'react';
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState({});
  const [pageSize, setPageSize] = useState(0);
  const handleChangePage = (e, value) => {
    e.preventDefault();
    setCurrentPage(value)
  }

  console.log('currentPage', currentPage);
  console.log('search', search);
  useEffect(() => {
    const getPosts = () => {
      postService.getCount().then(response => {
        setPageSize(response.length);
      }).catch(console.error());
      postService.getAll(currentPage, search).then(response => {
        const listPosts = response;
        setPosts({ ...posts, currentPage: listPosts })
      }).catch(console.error());
    }
    getPosts();
  }, [currentPage, search])


  return (
    <>
      <Head>
        <title>
          Pet-Friends Social
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
          <ProductListToolbar setSearch={setSearch} />
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
              count={pageSize / 3}
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
