import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Props {
  loading: boolean;
  content?: string;
}

export default function LoadingPage({
  loading = true,
  content = "Loading...",
}: Props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={100} color="inherit" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%", m: 2 }}
        >
          {content}
        </Typography>
      </Box>
    </Backdrop>
  );
}
