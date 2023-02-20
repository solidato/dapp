import { Box, Divider, Typography } from "@mui/material";

import { RESOLUTION_STATES } from "@lib/resolutions/common";

import ResolutionInfo from "@components/ResolutionInfo";
import User from "@components/User";

import { ResolutionEntityEnhanced } from "../../types";

export default function MainInfo({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  return (
    <>
      {![RESOLUTION_STATES.REJECTED, RESOLUTION_STATES.PRE_DRAFT].includes(resolution.state) && (
        <>
          <Typography variant="h6">
            {resolution.state !== RESOLUTION_STATES.ENDED ? (
              <span>DRAFT RESOLUTION OF THE SHAREHOLDERS (without convening a meeting of shareholders)</span>
            ) : (
              <span>MINUTES AND RESOLUTION OF THE SHAREHOLDERS (without convening a meeting of shareholders)</span>
            )}
          </Typography>
          <Divider sx={{ pt: 2, mb: 2 }} />
        </>
      )}
      <Typography variant="h5">Topic of the resolution: {resolution.title}</Typography>
      <Typography variant="body2" sx={{ pt: 1, pb: 0.5 }}>
        Created {resolution.createdAt} by
      </Typography>
      <User address={resolution.createBy} />
      <Divider sx={{ pt: 2, mb: 2 }} />
      <Box sx={{ mt: 2 }}>
        <ResolutionInfo resolution={resolution} />
      </Box>
    </>
  );
}
