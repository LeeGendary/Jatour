import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "../../Models/profiles";
import { Link } from "react-router-dom";

interface Props {
  profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={profile.image || "https://mui.com/static/images/avatar/1.jpg"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component={Link}
            to={`/profiles/${profile.username}`}
            sx={{
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {profile.displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.bio}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
});
