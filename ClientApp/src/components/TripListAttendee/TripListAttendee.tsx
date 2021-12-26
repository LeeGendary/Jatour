import { Stack, Avatar, Popover, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "../../Models/profiles";
import ProfileCard from "../Profiles/ProfilesCard";

interface Props {
  attendees: Profile[] | null;
}

export default observer(function TripListAttendee({ attendees }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // Mouse hover boolean
  const open = Boolean(anchorEl);

  return (
    <>
      <Stack direction="row" spacing={2}>
        {attendees?.map((attendee) => (
          <Box key={attendee.username}>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <ProfileCard profile={attendee} />
            </Popover>
            <Avatar
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              key={attendee.username}
              alt="Remy Sharp"
              src={
                attendee.image || "https://mui.com/static/images/avatar/1.jpg"
              }
            />
          </Box>
        ))}
      </Stack>
    </>
  );
});
