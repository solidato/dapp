import React from "react";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import useUsers from "@hooks/useUsers";

const getLettersFromName = (name: string) =>
  name
    ?.split(/\s/)
    .map((w) => Array.from(w)[0])
    .join("");

export default function User({ address }: { address: string }) {
  const { users, isLoading } = useUsers(address);
  const [currentUser] = users || [];

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isLoading ? (
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      ) : (
        <Avatar
          alt={currentUser?.display_name}
          src={`data:image/jpeg;charset=utf-8;base64,${currentUser?.image || ""}`}
        >
          {getLettersFromName(currentUser?.display_name)}
        </Avatar>
      )}
      <Box sx={{ ml: 2, width: "100%" }}>
        {isLoading ? (
          <>
            <Typography sx={{ mb: -0.5 }}>
              <Skeleton />
            </Typography>
            <Typography variant="caption">
              <Skeleton />
            </Typography>
          </>
        ) : (
          <>
            {currentUser?.display_name && <Typography sx={{ mb: -0.5 }}>{currentUser?.display_name}</Typography>}
            <Typography variant="caption">{address}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
