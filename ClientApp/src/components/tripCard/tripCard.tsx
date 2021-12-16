import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Trip } from "../../Models/trip";

interface Props {
  trip: Trip;
}

export default function TripCard({ trip }: Props) {
  return (
    <Card elevation={3} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="160"
        image={trip.picCoverUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {trip.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trip.description.substring(0, 30)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {trip.location} - Duration: {trip.duration}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
