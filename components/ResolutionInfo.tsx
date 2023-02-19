import { Chip, Stack, Typography } from "@mui/material";

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
  "pre-draft": "filled",
  rejected: "filled",
};

export default function ResolutionInfo({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  return (
    <Stack sx={{ pt: 2 }} direction="row" alignItems="center">
      <Typography variant="body2">Type: </Typography>
      <Chip
        variant="outlined"
        label={`${resolution.resolutionType.name} ${resolution.isNegative ? " (veto)" : ""}`}
        sx={{ ml: 0.5 }}
      />
      <Typography variant="body2" sx={{ ml: 2 }}>
        Status:{" "}
      </Typography>
      <Chip
        sx={{ ml: 0.5 }}
        label={resolution.state}
        color={STATE_TO_COLOR[resolution.state]}
        variant={STATE_TO_VARIANT[resolution.state]}
      />
    </Stack>
  );
}
