import { useAccount } from "wagmi";

import { useState } from "react";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import { RESOLUTION_STATES } from "@lib/resolutions/common";
import { isSameAddress } from "@lib/utils";

import Modal from "@components/Modal";
import ResolutionInfo from "@components/ResolutionInfo";
import User from "@components/User";
import VotingWidget from "@components/VotingWidget";

import { ResolutionEntityEnhanced } from "../../types";

export default function MainInfo({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const { address } = useAccount();
  const votingUser = address
    ? resolution.votingStatus.votersHaveVoted.find((voter) => isSameAddress(voter.address, address))
    : null;

  const handleVote = () => {
    setVoteModalOpen(true);
  };

  return (
    <>
      <Modal open={voteModalOpen} onClose={() => setVoteModalOpen(false)} title={resolution.title}>
        <VotingWidget resolution={resolution} />
      </Modal>
      <Stack direction="row" alignItems="center">
        <Box sx={{ width: resolution.state === RESOLUTION_STATES.VOTING ? "calc(100% - 120px)" : "auto" }}>
          <Typography variant="h5">
            Topic of the resolution: #{resolution.id} {resolution.title}
          </Typography>
          <Typography variant="body2" sx={{ pt: 1, pb: 0.5 }}>
            Created {resolution.createdAt} by
          </Typography>
          <User address={resolution.createBy} />
        </Box>
        {resolution.state === RESOLUTION_STATES.VOTING && (
          <Box>
            <Button variant="contained" color="primary" size={!votingUser ? "large" : "small"} onClick={handleVote}>
              {votingUser ? "Change vote" : "Vote"}
            </Button>
          </Box>
        )}
      </Stack>
      <Divider sx={{ pt: 2, mb: 2 }} />
      <Box sx={{ mt: 2 }}>
        <ResolutionInfo resolution={resolution} scrollGradient={false} />
      </Box>
    </>
  );
}
