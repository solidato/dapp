import { useAccount } from "wagmi";

import { InfoOutlined } from "@mui/icons-material";
import { Chip, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { getCurrentMonth } from "@lib/resolutions/common";

import User from "@components/User";

import useCurrentTasks from "@hooks/useCurrentTasks";
import useShareholderStatus from "@hooks/useShareholderStatus";
import useTimestamp from "@hooks/useTimestamp";

const messages: [number, string][] = [
  [22, "Working late 🦉"],
  [18, "Good evening 🌆"],
  [12, "Good afternoon 🌞"],
  [6, "Good morning 🐦"],
  [0, "Oh it's late 😴"],
];

export default function Header() {
  const { address } = useAccount();
  const { isLoading, totalHours } = useCurrentTasks();
  const { currentTimestamp } = useTimestamp();

  const { getShareholderStatus } = useShareholderStatus();

  const hr = currentTimestamp.getHours();
  const message = messages.find((msg) => hr >= msg[0]);
  const welcomeMessage = message ? message[1] : "Welcome";

  return (
    <>
      <Box sx={{ mr: 2 }}>
        <Typography variant="h3" sx={{ pb: 2 }}>
          {welcomeMessage}
        </Typography>
        <User address={address as string} shouldMarkCurrentUser={false} shortAddress />
        <Stack sx={{ pt: 2 }} spacing={1} direction="row">
          {getShareholderStatus(address as string).map((status) => (
            <Chip key={status} size="small" label={status} />
          ))}
        </Stack>
      </Box>
      <Paper sx={{ textAlign: "center", p: 2, ml: "auto" }}>
        {isLoading ? (
          <Box sx={{ width: 120 }}>
            <Typography variant="caption">
              <Skeleton />
            </Typography>
            <Typography variant="h4">
              <Skeleton />
            </Typography>
            <Typography variant="caption">
              <Skeleton />
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="caption">You worked</Typography>
            <Typography variant="h4">{totalHours} hr</Typography>
            <Typography variant="caption">in {getCurrentMonth()}, so far</Typography>
            <Tooltip title="Once approved, the corresponding tokens will be minted" arrow>
              <IconButton color="primary" aria-label="info" size="small">
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Paper>
    </>
  );
}
