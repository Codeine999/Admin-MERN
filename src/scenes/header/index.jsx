import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";

const Headerpage = () => {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Header" subtitle="List of Customers" />

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ width: isSmallerScreen ? "90%" : "50%" }} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
        <Button variant="contained" color="success" sx={{ width: "140px", height: "50px", fontSize: "1rem" }}>
          Success
        </Button>
      </Box>
    </Box>
  );
};

export default Headerpage;
