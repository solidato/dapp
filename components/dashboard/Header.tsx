import useSWR from "swr";
import { useAccount } from "wagmi";

import { InfoOutlined, MoneyOff } from "@mui/icons-material";
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { fetcher } from "@lib/net";
import { getCurrentMonth } from "@lib/resolutions/common";

import User from "@components/User";

export default function Header() {
  const { address } = useAccount();
  const { data } = useSWR("/api/tasks/not-approved-hours", fetcher);

  return (
    <>
      <div>
        <Typography variant="h3" sx={{ pb: 2 }}>
          Welcome,
        </Typography>
        <User address={address as string} />
      </div>
      <Paper sx={{ textAlign: "center", p: 2 }}>
        <Typography variant="caption">You worked</Typography>
        <Typography variant="h4">{data} hr</Typography>
        <Typography variant="caption">in {getCurrentMonth()}, so far</Typography>
        <Tooltip title="Once approved, you will be eligible for token allocation" arrow>
          <IconButton color="primary" aria-label="info" size="small">
            <InfoOutlined />
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
}
