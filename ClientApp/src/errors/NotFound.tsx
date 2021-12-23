import { Search } from "@mui/icons-material";
import { Button, Container, Typography, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400, mt: 10 }}>
      <Search
        sx={{ fontSize: 40, alignItems: "center", fontWeight: "700" }}
        color="warning"
      />
      <Typography gutterBottom variant="h3">
        Oops - we've looked everywhere and could not find this.
      </Typography>
      <Button fullWidth component={Link} to="/home">
        Return to home page
      </Button>
    </Container>
  );
}
