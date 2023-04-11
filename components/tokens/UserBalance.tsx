import { Button, Collapse, Paper, Slider, TextField, Typography } from "@mui/material";

import { TOKEN_SYMBOL } from "@lib/utils";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";

export default function UserBalance() {
  const { data } = useUserBalanceAndOffers();
  return (
    <>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3">Total Balance</Typography>
        <Typography variant="h4">
          {data?.balance.total} {TOKEN_SYMBOL}
        </Typography>
      </Paper>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3">Tradable</Typography>
        <Typography variant="h4">
          {data?.balance.unlocked} {TOKEN_SYMBOL}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} disabled={data?.balance.unlocked === 0}>
          I want to transfer some tokens
        </Button>
      </Paper>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3">Locked</Typography>
        <Typography variant="h4">
          {data?.balance.locked} {TOKEN_SYMBOL}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} disabled={data?.balance.locked === 0}>
          I want to offer some tokens
        </Button>
        <Collapse in>
          <Typography variant="h4">Offers</Typography>
          <Slider
            size="small"
            defaultValue={0}
            max={data?.balance.locked}
            aria-label="Small"
            valueLabelDisplay="auto"
            step={100}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} disabled={data?.balance.locked === 0}>
            Offer
          </Button>
        </Collapse>
      </Paper>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h3">Vesting</Typography>
        <Typography variant="h4">
          {data?.balance.vesting} {TOKEN_SYMBOL}
        </Typography>
      </Paper>
    </>
  );
}
