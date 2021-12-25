import { Stack, Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "../../Models/profiles";

interface Props {
  attendees: Profile[] | null;
}

export default observer(function TripListAttendee({ attendees }: Props) {
  return (
    <Stack direction="row" spacing={2}>
      {attendees?.map((attendee) => (
        <Avatar
          key={attendee.username}
          alt="Remy Sharp"
          src={attendee.image || "https://mui.com/static/images/avatar/1.jpg"}
        />
      ))}
    </Stack>
  );
});
