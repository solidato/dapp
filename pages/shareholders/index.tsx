import NextLink from "next/link";

import { useState } from "react";

import { Add } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, FormControlLabel, Grid, Link, Switch } from "@mui/material";

import UserCard from "@components/shareholders/UserCard";

import useUser from "@hooks/useUser";

import useShareholders from "../../hooks/useShareholders";

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

  const handleCreateShareholder = () => {
    console.log("Create shareholder");
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
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
          ?.filter((user) => !onlyManagingBoard || (onlyManagingBoard && user.status.includes("ManagingBoard")))
          .map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user.address}>
              <UserCard daoUser={user} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
