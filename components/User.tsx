import { useAccount } from "wagmi";

import React from "react";

import { Avatar, Box, Skeleton, Tooltip, Typography, Zoom } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

import { getLettersFromName } from "@lib/utils";

import useOdooUsers from "@hooks/useOdooUsers";

import { isSameAddress } from "../lib/utils";

export default function User({
  address,
  isInline = false,
  inlineVariant = "body2",
}: {
  address: string;
  isInline?: boolean;
  inlineVariant?: Variant;
}) {
  const { address: connectedAddress } = useAccount();
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
      <Typography component="span" variant={inlineVariant}>
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
        <Tooltip
          title={isSameAddress(connectedAddress as string, address) ? "you" : ""}
          placement="top"
          arrow
          TransitionComponent={Zoom}
        >
          <Avatar
            alt={currentUser?.display_name}
            src={`data:image/jpeg;charset=utf-8;base64,${currentUser?.image || ""}`}
            sx={
              isSameAddress(connectedAddress as string, address)
                ? {
                    boxShadow: (theme) => `0 0 0 3px ${theme.palette.success.main}`,
                    "@media print": { boxShadow: "none" },
                  }
                : {}
            }
          >
            {getLettersFromName(currentUser?.display_name)}
          </Avatar>
        </Tooltip>
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
            {currentUser?.display_name && <Typography sx={{ mb: -1 }}>{currentUser?.display_name} </Typography>}
            <Typography variant="caption">{address}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
