import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Paper, Stack, Typography } from "@mui/material";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";

const PAPER_SX = {
  p: 4,
  borderRadius: 3,
  width: 400,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
  textAlign: "center",
};

export default function UserBalance() {
  const { data } = useUserBalanceAndOffers();

  return (
    <Box sx={{ position: "relative" }}>
      <AddCircleIcon sx={{ position: "absolute", left: "50%", top: "50%", ml: -2, mt: -4 }} fontSize="large" />
      <Stack direction="row" justifyContent="center" spacing={8} sx={{ pb: 4 }}>
        <Paper sx={PAPER_SX}>
          <Typography variant="h4">Governance Balance</Typography>
          <Typography variant="h3" sx={{ width: "100%" }}>
            TODO
          </Typography>
        </Paper>
        <Paper sx={PAPER_SX}>
          <Typography variant="h4">NKD Balance</Typography>
          <Typography variant="h3" sx={{ width: "100%" }}>
            {data?.balance.total}
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
