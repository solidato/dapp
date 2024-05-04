import useSWR from "swr";
import { useAccount } from "wagmi";

import { useEffect, useState } from "react";

import { Avatar, Box, Skeleton, SxProps, Tooltip, Typography, Zoom } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

import { fetcher } from "@lib/net";
import { getLettersFromName, isSameAddress, shortEthAddress } from "@lib/utils";

import { Shareholder } from "../schema/shareholders";
import { AuthUser } from "../types";

export default function User({
  user,
  address,
  isInline = false,
  inlineVariant = "body2",
  shouldMarkCurrentUser = true,
  isLoading = false,
  sx = {},
}: {
  user?: Partial<Shareholder | AuthUser>;
  address?: string;
  isInline?: boolean;
  shouldMarkCurrentUser?: boolean;
  inlineVariant?: Variant;
  isLoading?: boolean;
  sx?: SxProps;
}) {
  const [shareholder, setShareholder] = useState(user || {});
  const { address: connectedAddress } = useAccount();
  const shortAddress = shortEthAddress(shareholder.ethAddress);
  const { data: fetchedUser } = useSWR<Shareholder>(address && !user ? `/api/users/${address}` : null, fetcher);

  useEffect(() => {
    if (fetchedUser) {
      setShareholder(fetchedUser);
    }
  }, [fetchedUser]);

  if (isInline) {
    return isLoading ? (
      <Typography variant="body2" component="span">
        <Skeleton sx={{ width: 100, display: "inline-block" }} />
      </Typography>
    ) : (
      <Typography component="span" variant={inlineVariant}>
        <b>{shareholder.name ? `${shareholder.name} (${shortAddress})` : shortAddress}</b>
      </Typography>
    );
  }

  const markCurrentUser = shouldMarkCurrentUser && isSameAddress(connectedAddress, shareholder.ethAddress);

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      {isLoading ? (
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      ) : (
        <Tooltip title={markCurrentUser ? "you" : ""} placement="top" arrow TransitionComponent={Zoom}>
          <Avatar
            alt={shareholder.name}
            src={`data:image/jpeg;charset=utf-8;base64,${user?.avatar || ""}`}
            sx={
              markCurrentUser
                ? {
                    boxShadow: (theme) => `0 0 0 3px ${theme.palette.success.main}`,
                    "@media print": { boxShadow: "none" },
                  }
                : {}
            }
          >
            {getLettersFromName(shareholder.name || "")}
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
            {shareholder.name && (
              <Typography variant="h6" sx={{ mb: -1 }}>
                {shareholder.name}
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
              {shortAddress}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
