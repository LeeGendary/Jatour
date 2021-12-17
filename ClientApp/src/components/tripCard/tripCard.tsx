import React, { SyntheticEvent } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Trip } from "../../Models/trip";
import { useStore } from "../../stores/store";
import { Link } from "react-router-dom";

interface Props {
  trip: Trip;
}

export default function TripCard({ trip }: Props) {
  // const [target, setTarget] = useState("");
  const { tripStore } = useStore();
  const { deleteTrip } = tripStore;

  function handleTripDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    // setTarget(e.currentTarget.name);
    deleteTrip(id);
  }
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
          {trip.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {trip.location} - Duration: {trip.duration}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/details/${trip.id}`}
          size="small"
          color="info"
        >
          View
        </Button>
        <Button
          name={trip.id}
          onClick={(e) => handleTripDelete(e, trip.id)}
          size="small"
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
