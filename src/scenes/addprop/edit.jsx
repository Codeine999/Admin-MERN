import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    useTheme,
    useMediaQuery,
    FormControl,
    FormHelperText,
    TextareaAutosize,
    Typography,
    MenuItem,
    Stack,
    Select,
  } from "@mui/material";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "state/api";
import Header from "components/Header";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading } = useGetBlogByIdQuery(id);
  const [updateBlog, { isError }] = useUpdateBlogMutation();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (blog && !isLoading) {
      setTitle(blog.title);
      setDescription(blog.description);
    }
  }, [blog, isLoading]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      if (typeof image === "object" && image.type.startsWith("image/")) {
        formData.append("image", image);
      } else {
        // Show an error message if the file is not an image
        return;
      }
    }
  
    await updateBlog({ id, formData }); // <-- Make sure you are passing the formData correctly here
    navigate("/blog");
  };

  if (isLoading) {
    return <Typography>Loading blog...</Typography>;
  }

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Edit Blog" subtitle="List of Customers" />
    <form
      style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
      onSubmit={handleFormSubmit}
    
    >
      <FormControl>
        <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>Enter property name</FormHelperText>
        <TextField
          fullWidth
          required
          id="outlined-basic"
          color="info"
          variant="outlined"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        /> <Typography fontSize={14} color="#fcfcfc" sx={{ wordBreak: 'break-all' }}>{image ? image.name : ''}</Typography>
      </FormControl>

      <FormControl>
        <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>Property Description</FormHelperText>
        <TextareaAutosize
          minRows={5}
          required
          placeholder="Write description of property"
          color="info"
          style={{ width: '100%', background: 'transparent', fontSize: '16px',  borderRadius: 6, padding: 10, color: '#919191' }}
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Stack direction="column" gap={1} justifyContent="center" mb={2}>
        <Stack direction="row" gap={2}>
          <Typography fontSize={16} fontWeight={500} my="10px">Property Photo</Typography>

          <Button component="label" sx={{ width: 'fit-content', color: '#2ED480', textTransform: 'capitalize', fontSize: 16 }}>
            Upload *
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
        </Stack>
        <Typography fontSize={14} color="#fcfcfc" sx={{ wordBreak: 'break-all' }}>
          
        </Typography>
      </Stack>
      
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
      
      <Button type="submit" variant="contained" color="success"  sx={{ width: "140px", height: "50px", fontSize: "1rem" }}>
        Success
      </Button>
    </Box>
    </form>
  </Box>
  );
};

export default Edit;
