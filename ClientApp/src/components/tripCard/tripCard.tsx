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
import { Divider, IconButton } from "@mui/material";
import {
  AccessTime,
  Delete,
  FavoriteBorder,
  LocationOn,
  People,
  Person,
  Star,
} from "@mui/icons-material";
import { Box } from "@mui/system";

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
    <Card raised={true} sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="200"
        image={trip.picCoverUrl}
        alt="green iguana"
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", padding: "20px" }}>
          <Typography
            sx={{ color: "rgb(99 115 129)" }}
            gutterBottom
            variant="subtitle2"
            component="div"
          >
            {trip.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {trip.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <IconButton aria-label="add to favorites">
            <LocationOn />
            <Typography variant="body2" color="text.secondary">
              {trip.location}
            </Typography>
          </IconButton>
          <IconButton aria-label="add to favorites">
            <AccessTime />
            <Typography variant="body2" color="text.secondary">
              {trip.duration}
            </Typography>
          </IconButton>
          {trip.attendees ? (
            <IconButton aria-label="add to favorites">
              {trip.attendees?.length === 1 ? <Person /> : <People />}
              <Typography variant="body2" color="text.secondary">
                {trip.attendees?.length} going
              </Typography>
            </IconButton>
          ) : (
            " "
          )}
        </Box>
      </CardContent>
      <Divider variant="middle" />
      <CardActions sx={{ justifyContent: "space-between", padding: "20px" }}>
        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
          </IconButton>
          <IconButton aria-label="share">
            <Star sx={{ color: "rgb(255, 200, 26)" }} />
            <Typography variant="h6">{trip.rating}</Typography>
          </IconButton>
        </Box>
        <Box>
          <Button
            variant="outlined"
            component={Link}
            to={`/details/${trip.id}`}
            size="small"
            color="info"
          >
            Details
          </Button>

          <IconButton
            name={trip.id}
            color="error"
            aria-label="delete"
            onClick={(e) => handleTripDelete(e, trip.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
