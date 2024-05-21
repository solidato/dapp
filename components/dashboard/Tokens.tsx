import useSWR from "swr";

import { Box, Divider, Typography } from "@mui/material";

import { getDaoManagerQuery } from "@graphql/subgraph/queries/get-dao-manager-query";
import { useSubgraphGraphQL } from "@graphql/subgraph/subgraph-client";

import UserBalance from "@components/tokens/UserBalance";

import useUserBalanceAndOffers, { bigIntToNum } from "@hooks/useUserBalanceAndOffers";

export default function Tokens() {
  const { data } = useUserBalanceAndOffers();
  const { data: daoManagerData } = useSubgraphGraphQL(getDaoManagerQuery);

  const totalVotingPower = bigIntToNum(daoManagerData?.daoManager?.totalVotingPower || BigInt(0));
  const userVotingPower = ((100 * (data?.balance?.votingPower || 0)) / totalVotingPower).toFixed(2);

  return (
    <>
      <UserBalance />
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", mt: 4, justifyContent: "space-between" }}>
        <Typography sx={{ mb: 4 }} variant="h6">
          Your ownership rights: {userVotingPower} %
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h6">
          Your voting rights: {userVotingPower} %
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h6">
          Your dividend rights: {userVotingPower} %
        </Typography>
      </Box>
    </>
  );
}
