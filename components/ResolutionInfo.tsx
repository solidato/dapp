import { useAccount } from "wagmi";

import { Box, Chip, Stack, Typography, alpha } from "@mui/material";

import { isSameAddress } from "@lib/utils";

import { ResolutionEntityEnhanced, ResolutionState } from "../types";

const STATE_TO_COLOR: Record<ResolutionState, any> = {
  ended: "default",
  notice: "warning",
  voting: "error",
  "pre-draft": "info",
  rejected: "error",
};

const STATE_TO_VARIANT: Record<ResolutionState, "outlined" | "filled"> = {
  ended: "outlined",
  notice: "filled",
  voting: "outlined",
  "pre-draft": "outlined",
  rejected: "filled",
};

export default function ResolutionInfo({
  resolution,
  hideState = false,
  chipSize = "medium",
}: {
  resolution: ResolutionEntityEnhanced;
  hideState?: boolean;
  chipSize?: "medium" | "small";
}) {
  const { address } = useAccount();
  const votingUser = address
    ? resolution.votingStatus.votersHaveVoted.find((voter) => isSameAddress(voter.address, address))
    : null;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        whiteSpace: "nowrap",
        overflow: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: 16,
          height: "100%",
          background: (t) =>
            `linear-gradient(to right, ${alpha(t.palette.grey["100"], 0)}, ${alpha(t.palette.grey["100"], 1)})`,
          ['[data-mui-color-scheme="dark"] &']: {
            background: (t) =>
              `linear-gradient(to right, ${alpha(t.palette.grey["900"], 0)}, ${alpha(t.palette.grey["900"], 1)})`,
          },
        },
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: 16,
          height: "100%",
          background: (t) =>
            `linear-gradient(to left, ${alpha(t.palette.grey["100"], 0)}, ${alpha(t.palette.grey["100"], 1)})`,
          ['[data-mui-color-scheme="dark"] &']: {
            background: (t) =>
              `linear-gradient(to left, ${alpha(t.palette.grey["900"], 0)}, ${alpha(t.palette.grey["900"], 1)})`,
          },
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          whiteSpace: "nowrap",
          overflow: "auto",
          width: "100%",
          pr: 2,
          pl: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Typography variant="body2">Resolution Type: </Typography>
        <Chip
          variant="outlined"
          label={`${resolution.resolutionType.name} ${resolution.isNegative ? " (veto)" : ""}`}
          sx={{ ml: 0.5 }}
          size={chipSize}
        />
        {!hideState && (
          <>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Resolution Status:{" "}
            </Typography>
            <Chip
              size={chipSize}
              sx={{ ml: 0.5 }}
              label={resolution.state}
              color={STATE_TO_COLOR[resolution.state]}
              variant={STATE_TO_VARIANT[resolution.state]}
            />
          </>
        )}
        {votingUser && (
          <>
            <Typography variant="body2" sx={{ ml: 2, "@media print": { display: "none" } }}>
              Your Vote:{" "}
            </Typography>
            <Chip
              size={chipSize}
              sx={{ ml: 0.5, "@media print": { display: "none" } }}
              label={votingUser.hasVotedYes ? "Yes" : "No"}
              variant="outlined"
            />
          </>
        )}
      </Stack>
    </Box>
  );
}
