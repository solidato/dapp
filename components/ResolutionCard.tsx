import Link from "next/link";

import * as React from "react";
import { useState } from "react";

import { Alert, Box, Button, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import ResolutionInfo from "@components/ResolutionInfo";
import User from "@components/User";

import { RESOLUTION_STATES } from "../lib/resolutions/common";
import { ResolutionEntityEnhanced } from "../types";
import Modal from "./Modal";
import VotingWidget from "./VotingWidget";

export default function ResolutionCard({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  const [voteModalOpen, setVoteModalOpen] = useState(false);

  const handleVote = () => {
    setVoteModalOpen(true);
  };

  return (
    <Card variant={resolution.state === RESOLUTION_STATES.VOTING ? "elevation" : "outlined"} elevation={12}>
      <Modal open={voteModalOpen} setOpen={(open) => setVoteModalOpen(open)} title={resolution.title}>
        <VotingWidget resolution={resolution} />
      </Modal>
      <CardHeader
        title={resolution.title}
        titleTypographyProps={{
          variant: "h6",
          lineHeight: "1.5rem",
        }}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 0, pb: 0 }}>
        <Typography variant="body2" sx={{ pt: 1, pb: 0.5 }}>
          Created on {resolution.createdAt} by
        </Typography>
        <User address={resolution.createBy} />
        <Box sx={{ mt: 2 }}>
          {resolution.state === RESOLUTION_STATES.VOTING && (
            <Alert
              severity="info"
              action={
                <Button variant="contained" color="primary" size="small" onClick={handleVote}>
                  Vote
                </Button>
              }
            >
              You can now vote for this resolution
            </Alert>
          )}
          {resolution.state === RESOLUTION_STATES.ENDED && (
            <Alert severity={resolution.hasQuorum ? "success" : "error"}>
              {resolution.hasQuorum ? "This resolution has been approved" : "This resolution has not been approved"}
            </Alert>
          )}
          {resolution.state === RESOLUTION_STATES.REJECTED && (
            <Alert severity="error">This resolution has been rejected</Alert>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ mt: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <ResolutionInfo chipSize="small" resolution={resolution} hideState />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            href={
              resolution.state === RESOLUTION_STATES.PRE_DRAFT
                ? `/resolutions/${resolution.id}/edit`
                : `/resolutions/${resolution.id}`
            }
            LinkComponent={Link}
          >
            View
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
