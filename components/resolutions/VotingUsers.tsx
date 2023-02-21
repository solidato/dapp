import { Grid } from "@mui/material";

import { ResolutionVoter } from "../../types";
import UserCard from "../UserCard";

export default function VotingUsers({ voters }: { voters: ResolutionVoter[] }) {
  return (
    <Grid container spacing={2}>
      {voters.map((resolutionVoter) => (
        <Grid item xs={12} md={6} lg={4} key={resolutionVoter.address}>
          <UserCard
            user={resolutionVoter}
            percentageOfAllVotes={(
              (100 * resolutionVoter.votingPowerInt) /
              voters.reduce((total, voter) => total + voter.votingPowerInt, 0)
            ).toFixed(2)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
