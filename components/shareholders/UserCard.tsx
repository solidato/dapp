import { useAccount } from "wagmi";

import { ReactElement } from "react";

import { Box, Card, CardActions, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";

import { isSameAddress } from "@lib/utils";

import User from "@components/User";

import { DaoUser } from "@hooks/useShareholders";

export default function UserCard({ daoUser, cta }: { daoUser: DaoUser; cta?: ReactElement }) {
  const { address: connectedAddress } = useAccount();

  const cardProps = isSameAddress(connectedAddress as string, daoUser.address)
    ? {
        variant: "elevation" as "elevation",
        elevation: 6,
      }
    : { variant: "outlined" as "outlined" };

  return (
    <Card {...cardProps}>
      <CardContent sx={{ pt: 3, pb: 3 }}>
        <User user={{ ...(daoUser.user || {}), ethAddress: daoUser.address }} />
        <Stack
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ textAlign: "center", mt: 2 }}
        >
          <Box>
            <Typography variant="body2">Voting power</Typography>
            <Typography variant="caption">{daoUser.power}%</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ borderTop: (t) => `1px solid ${t.palette.divider}`, display: "flex", width: "100%" }}>
        {(daoUser.status || daoUser.user?.status || []).map((status) => (
          <Chip key={status} size="small" label={status} />
        ))}
        <Box ml="auto !important">{cta}</Box>
      </CardActions>
    </Card>
  );
}
