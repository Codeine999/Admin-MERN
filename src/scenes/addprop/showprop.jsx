import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  CardMedia,
  Button,
  Typography,
  Rating,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetBlogsQuery, useDeletePostMutation, } from "state/api";
import Addbutton from "components/Addbutton";

const Headerpage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [expanded, setExpanded] = useState(false);
  // const [postId, setPostId] = useState("");

  const handleAddBlogClick = () => {
    navigate("/blog/create");
  };
  const handleEditBlog = (id) => {
    navigate(`/blog/edit/${id}`);
  };
 
 
  const [deletePost, { isLoading: isDeleting, isError }] = useDeletePostMutation();
  const { data: blogs, isLoading } = useGetBlogsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="Blog" subtitle="List of Customers" />
        <Addbutton onClick={handleAddBlogClick} />
      </Box>
      <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
      {isLoading ? (
        <Typography>Loading blogs...</Typography>
      ) : (
        <>
          {blogs.map((blog) => (
            <Box mt="3rem" key={blog._id}>
              <Card sx={{ maxWidth: 370, marginRight: "2rem" }}>
                <CardMedia
                component="img"
                  sx={{ height: 140 }}
                  image={blog.image}
                  title={blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", marginTop: "4rem", marginLeft: "5rem" }}>
                    <Button type="submit" variant="contained" color="secondary"  sx={{ width: "70px", height: "45px", fontSize: "15px", marginRight: "1rem" }}
                    onClick={() => handleEditBlog(blog._id)}>
                      Edit
                    </Button>
                    <Button type="submit" variant="contained" color="error"  sx={{ width: "70px", height: "45px", fontSize: "15px" }}
                      onClick={() => deletePost(blog._id)}>
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))}
        </>
      )}
      </Box>
    </Box>
  );
};

export default Headerpage;
