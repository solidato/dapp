import { Grid } from "@mui/material";

import { ResolutionVoter } from "../../types";
import UserCard from "./UserCard";

export const sortByVotingPower = ({ votingPower: a }: ResolutionVoter, { votingPower: b }: ResolutionVoter) => {
  if (Number(a) < Number(b)) {
    return 1;
  }
  if (Number(a) > Number(b)) {
    return -1;
  }
  return 0;
};

export default function VotingUsers({ voters }: { voters: ResolutionVoter[] }) {
  return (
    <Grid container spacing={2}>
      {voters.sort(sortByVotingPower).map((resolutionVoter) => (
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
