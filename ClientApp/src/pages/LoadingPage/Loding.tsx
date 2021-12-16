import { Backdrop, Box, CircularProgress } from "@mui/material";
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
      <CircularProgress color="inherit" />
      <Box sx={{ m: 2 }}>{content}</Box>
    </Backdrop>
  );
}
