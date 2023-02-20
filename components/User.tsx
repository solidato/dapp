import React from "react";

import { Avatar, Box, Skeleton, Typography } from "@mui/material";

import { getLettersFromName } from "@lib/utils";

import useOdooUsers from "@hooks/useOdooUsers";

export default function User({ address, isInline = false }: { address: string; isInline?: boolean }) {
  const { users, isLoading } = useOdooUsers(address);
  const [currentUser] = users.length > 0 ? users : [{ display_name: "unknown", image: "" }];

  if (isInline && isLoading) {
    return (
      <Typography variant="body2" component="span">
        <Skeleton />
      </Typography>
    );
  }

  if (isInline && !isLoading) {
    return (
      <Typography component="span" variant="body2">
        <b>{`${currentUser?.display_name} (${address?.slice(0, 8)}...)`}</b>
      </Typography>
    );
  }

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
      <Box sx={{ ml: 1, width: "100%" }}>
        {isLoading ? (
          <>
            <Typography sx={{ mb: -0.6 }}>
              <Skeleton />
            </Typography>
            <Typography variant="caption">
              <Skeleton />
            </Typography>
          </>
        ) : (
          <>
            {currentUser?.display_name && <Typography sx={{ mb: -1 }}>{currentUser?.display_name}</Typography>}
            <Typography variant="caption">{address}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
