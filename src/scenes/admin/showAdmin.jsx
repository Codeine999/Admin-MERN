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
import Addbutton from "components/Addbutton";
import { useGetBlogsQuery, useDeletePostMutation, } from "state/api";

const ShowAdmin = () => {

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/admin/addadmin");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="Admin2" subtitle="List of Customers" />
        <Addbutton onClick={handleAdd} />
        
      </Box>
    </Box>
  );
};

export default ShowAdmin;
