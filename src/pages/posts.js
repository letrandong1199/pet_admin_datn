import Head from "next/head";
import { Box, Container, Grid, Pagination, Chip } from "@mui/material";
import { ProductListToolbar } from "../components/post/post-list-toolbar";
import { ProductCard } from "../components/post/post-card";
import { DashboardLayout } from "../components/dashboard-layout";
import postService from "src/services/post.service";
import { useState, useEffect } from "react";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [warning, setWarning] = useState(false);
  const [posts, setPosts] = useState({});
  const [pageSize, setPageSize] = useState(0);
  const handleChangePage = (e, value) => {
    e.preventDefault();
    setCurrentPage(value);
  };

  console.log("currentPage", currentPage);
  console.log("search", search);
  useEffect(() => {
    const getPosts = () => {
      if (warning) {
        postService
          .getSummary()
          .then((response) => {
            setPageSize(response.total_post - response.total_allowed_post);
          })
          .catch(console.error());
        postService
          .getWarning(currentPage, search)
          .then((response) => {
            const listPosts = response;
            console.log("Halo", response);
            setPosts({ ...posts, currentPage: listPosts });
          })
          .catch(console.error());
      } else {
        postService
          .getSummary()
          .then((response) => {
            setPageSize(response.total_post);
          })
          .catch(console.error());
        postService
          .getAll(currentPage, search)
          .then((response) => {
            const listPosts = response;
            console.log("Halo", response);
            setPosts({ ...posts, currentPage: listPosts });
          })
          .catch(console.error());
      }
    };
    getPosts();
  }, [currentPage, search, warning]);

  const setUpdated = (newData) => {
    const newPosts = { ...posts };
    Object.keys(newPosts).forEach((pageNo) => {
      const temp = [...posts[pageNo]];
      const filtered = temp.filter((value) => value.id == newData.id);
      if (temp.length > 0) {
        const indexData = temp.indexOf(filtered[0]);
        temp[indexData] = newData;
        return;
      }
    });
    console.log("ff", newPosts);
    setPosts(newPosts);
  };

  return (
    <>
      <Head>
        <title>Pet-Friends Social</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar setSearch={setSearch} />
          <Box sx={{ pt: 2 }}>
            <Chip
              label="All"
              onClick={() => {
                setCurrentPage(1);
                setWarning(false);
              }}
              sx={{ mr: 1 }}
            />
            <Chip
              color="warning"
              label="Warning"
              onClick={() => {
                setCurrentPage(1);
                setWarning(true);
              }}
            />
          </Box>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              {posts.currentPage?.map((post) => (
                <Grid item key={post.id} lg={4} md={6} xs={12}>
                  <ProductCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              count={Math.round(pageSize / 3)}
              page={currentPage}
              size="small"
              onChange={handleChangePage}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
