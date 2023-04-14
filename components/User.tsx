import { useAccount } from "wagmi";

import React from "react";

import { Avatar, Box, Skeleton, SxProps, Tooltip, Typography, Zoom } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

import { getLettersFromName } from "@lib/utils";

import useOdooUsers from "@hooks/useOdooUsers";

import { isSameAddress } from "../lib/utils";

export default function User({
  address,
  isInline = false,
  inlineVariant = "body2",
  shouldMarkCurrentUser = true,
  shortAddress = false,
  isSkeleton = false,
  sx = {},
}: {
  address?: string;
  isInline?: boolean;
  shouldMarkCurrentUser?: boolean;
  shortAddress?: boolean;
  inlineVariant?: Variant;
  isSkeleton?: boolean;
  sx?: SxProps;
}) {
  const { address: connectedAddress } = useAccount();
  const { users, isLoading: isLoadingUsers } = useOdooUsers(address);
  const [currentUser] = users.length > 0 ? users : [{ display_name: "unknown", image: "" }];

  const isLoading = isLoadingUsers || isSkeleton;

  if (isInline && isLoading) {
    return (
      <Typography variant="body2" component="span">
        <Skeleton sx={{ width: 100, display: "inline-block" }} />
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

  const markCurrentUser = isSameAddress(connectedAddress as string, address as string) && shouldMarkCurrentUser;

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      {isLoading ? (
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      ) : (
        <Tooltip title={markCurrentUser ? "you" : ""} placement="top" arrow TransitionComponent={Zoom}>
          <Avatar
            alt={currentUser?.display_name}
            src={`data:image/jpeg;charset=utf-8;base64,${currentUser?.image || ""}`}
            sx={
              markCurrentUser
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
            {currentUser?.display_name && (
              <Typography variant="h6" sx={{ mb: -1 }}>
                {currentUser?.display_name}{" "}
              </Typography>
            )}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                ...(shortAddress
                  ? {
                      maxWidth: { xs: "100px", md: "auto" },
                      overflow: { xs: "hidden", md: "visible" },
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }
                  : {}),
              }}
            >
              {address}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
