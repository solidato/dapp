import { useAccount } from "wagmi";

import { Box, Card, CardActions, CardContent, Chip, Divider, ListItem, Paper, Stack, Typography } from "@mui/material";

import { isSameAddress } from "@lib/utils";

import User from "@components/User";

export default function UserCard({
  address,
  balance,
  power,
  statuses,
}: {
  address: string;
  balance: number;
  power: number;
  statuses: string[];
}) {
  const { address: connectedAddress } = useAccount();

  return (
    <Card variant={isSameAddress(connectedAddress as string, address) ? "elevation" : "outlined"} elevation={6}>
      <CardContent sx={{ pt: 3, pb: 3 }}>
        <User address={address} />
        <Stack
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ textAlign: "center", mt: 2 }}
        >
          <Box>
            <Typography variant="body2">Tokens</Typography>
            <Typography variant="caption">{balance}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Voting power</Typography>
            <Typography variant="caption">{power}%</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ borderTop: (t) => `1px solid ${t.palette.divider}` }}>
        {statuses.map((status) => (
          <Chip key={status} size="small" label={status} />
        ))}
      </CardActions>
    </Card>
  );
}
