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
        <TokenPaper title="Locked" total={data?.balance.locked} />
        <OfferTokens />
      </Row>
      {(data?.balance.currentlyOffered || 0) > 0 && (
        <Row>
          <TokenPaper title="Offered" total={data?.balance.currentlyOffered} />
        </Row>
      )}
      {(data?.balance.unlocked || 0) > 0 && (
        <Row>
          <TokenPaper title="Unlocked" total={data?.balance.unlocked} />
          <WithdrawTokens />
        </Row>
      )}
      <Row>
        <TokenPaper title="NKD Balance" total={data?.balance.total} />
        <DepositTokens />
      </Row>
      {(data?.balance.vesting || 0) > 0 && (
        <Row>
          <TokenPaper title="Vesting" total={data?.balance.vesting} />
        </Row>
      )}
    </>
  );
}
