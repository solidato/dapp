import { Box, Paper, SxProps, Typography } from "@mui/material";

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
  const { data } = useUserBalanceAndOffers();
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
        <TokenPaper title="Unlocked" total={data?.balance.unlockedTokens} />
        <WithdrawTokens />
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
