import useSWR from "swr";
import { useAccount } from "wagmi";

import { Box, CircularProgress, Paper, SxProps, Typography } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getDaoManagerQuery } from "@graphql/queries/get-dao-manager.query";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";

import DepositTokens from "./DepositTokens";
import OfferTokens from "./OfferTokens";
import WithdrawTokens from "./WithdrawTokens";

const TokenPaper = ({ title, total }: { title: string; total: number | undefined }) => (
  <Paper sx={{ p: 4, textAlign: "center", br: 3, width: 200, mr: 4 }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h5">{total}</Typography>
  </Paper>
);

const Row = ({ children, sx = {} }: { children: React.ReactNode; sx?: SxProps }) => (
  <Box sx={{ display: "flex", alignItems: "center", pt: 6, ...sx }}>{children}</Box>
);

export default function UserActions() {
  const { data, isLoading } = useUserBalanceAndOffers();
  const { data: daoManagerData, isLoading: isLoadingDaoManagerData } = useSWR<any>(getDaoManagerQuery, fetcher);
  const { address } = useAccount();

  const loading = isLoading || isLoadingDaoManagerData;

  if (loading) {
    return <CircularProgress />;
  }

  const isInvestor = daoManagerData.daoManager.investorsAddresses.includes(address?.toLowerCase());
  const withdrawableBalance = isInvestor
    ? (data?.balance.governanceTokens || 0) - (data?.balance.vestingTokens || 0)
    : data?.balance.unlockedTokens;

  return (
    <>
      <Row sx={{ pt: 3 }}>
        <TokenPaper title="Locked" total={data?.balance.lockedTokens} />
        <OfferTokens />
      </Row>
      <Row>
        <TokenPaper title="Offered" total={data?.balance.offeredTokens} />
      </Row>
      <Row>
        <TokenPaper title="Unlocked" total={withdrawableBalance} />
        <WithdrawTokens withdrawableBalance={withdrawableBalance || 0} />
      </Row>
      <Row>
        <TokenPaper title="NEOK Balance" total={data?.balance.neokTokens} />
        <DepositTokens />
      </Row>
      <Row>
        <TokenPaper title="Vesting" total={data?.balance.vestingTokens} />
      </Row>
    </>
  );
}
