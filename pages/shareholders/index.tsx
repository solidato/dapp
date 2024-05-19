import NextLink from "next/link";

import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { Alert, Box, Button, CircularProgress, FormControlLabel, Grid, Link, Switch, Typography } from "@mui/material";

import UserCard from "@components/shareholders/UserCard";

import useUser from "@hooks/useUser";

import useShareholders from "../../hooks/useShareholders";
import { SHAREHOLDERS_ROLES } from "../../lib/constants";

Shareholders.title = "Shareholders";
Shareholders.checkMismatch = true;

export default function Shareholders() {
  const { user } = useUser();
  const [onlyManagingBoard, setOnlyManagingBoard] = useState(false);
  const { daoUsers, isLoading, error } = useShareholders();

  if (error) {
    return null;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  const downloadShareholderList = () => console.log("downloadShareholderList");

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Shareholder register
      </Typography>
      <Alert severity="info" sx={{ mb: 4 }}>
        The company has three possible types of shareholders:
        <ul>
          <li>Common Shareholder</li>
          <li>Passive Shareholder</li>
          <li>Active Shareholder</li>
        </ul>
        Common Shareholders are having ownership, voting and dividend rights based on their shareholding size without
        exceptions. <br />
        Passive Shareholders does not have voting rights, but are otherwise like Common Shareholders. <br />
        Active Shareholders are like Common Shareholders with the possibility to use Time Tracking functionality to
        increase their shareholding in the company. <br />
        <br />
        Each Shareholder shall be assigned its shareholder type upon joining the company (can be changed afterwards).
      </Alert>

      <Box display="flex" justifyContent="space-between" sx={{ mt: 2, mb: 2 }}>
        <Box display="flex">
          <Button sx={{ mr: 2 }} variant="outlined" href="/shareholders/new" LinkComponent={NextLink}>
            <AddIcon sx={{ mr: 1 }} /> New shareholder
          </Button>
          <Button variant="outlined" onClick={() => downloadShareholderList()}>
            <DownloadIcon sx={{ mr: 1 }} /> DOWNLOAD SHAREHOLDER LIST
          </Button>
        </Box>
        <FormControlLabel
          sx={{ ml: "auto" }}
          control={<Switch checked={onlyManagingBoard} onChange={() => setOnlyManagingBoard((omb) => !omb)} />}
          label="Display only managing board members"
        />
      </Box>
      {!user?.isLoggedIn && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="warning">
            To view shareholder information, please{" "}
            <Link component={NextLink} href="/login">
              log in
            </Link>
          </Alert>
        </Box>
      )}
      <Grid container spacing={2}>
        {daoUsers
          ?.filter(
            (user) =>
              !onlyManagingBoard || (onlyManagingBoard && user.status.includes(SHAREHOLDERS_ROLES.BOARD_MEMBER)),
          )
          .map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user.address}>
              <UserCard daoUser={user} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
