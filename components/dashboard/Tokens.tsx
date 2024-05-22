import useSWR from "swr";
import { useAccount } from "wagmi";

import { useMemo } from "react";

import { Box, Divider, Typography } from "@mui/material";

import { getDaoManagerQuery } from "@graphql/subgraph/queries/get-dao-manager-query";
import { useSubgraphGraphQL } from "@graphql/subgraph/subgraph-client";

import UserBalance from "@components/tokens/UserBalance";

import useUserBalanceAndOffers, { bigIntToNum } from "@hooks/useUserBalanceAndOffers";

import useShareholders from "../../hooks/useShareholders";

export default function Tokens() {
  // const { data } = useUserBalanceAndOffers();
  const { address } = useAccount();
  const { daoUsers } = useShareholders();
  const daoUser = useMemo(() => {
    return daoUsers?.find((user) => user.address.toLowerCase() === address?.toLowerCase());
  }, [daoUsers]);

  return (
    <>
      <UserBalance balance={daoUser?.shareholdingRights || "-"} />
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", mt: 4, justifyContent: "space-between" }}>
        <Typography sx={{ mb: 4 }} variant="h6">
          Your ownership rights: {daoUser?.ownership} %
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h6">
          Your voting rights: {daoUser?.power} %
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h6">
          Your dividend rights: {daoUser?.ownership} %
        </Typography>
      </Box>
    </>
  );
}
