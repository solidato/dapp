import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import NextLink from "next/link";
import useSWR from "swr";
import { DaoUser } from "types";
import { shallow } from "zustand/shallow";

import * as React from "react";

import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  Switch,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { fetcher } from "@graphql/client";
import { getShareholdersInfo } from "@graphql/queries/get-shareholders-info.query";

import useLoginModalStore from "@store/loginModal";

import User from "@components/User";

import useUser from "@hooks/useUser";

import UserCard from "../components/shareholders/UserCard";

const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

Shareholders.title = "Shareholders";

export default function Shareholders() {
  const { user } = useUser();
  const { data, isLoading } = useSWR(getShareholdersInfo, fetcher);
  const [onlyManagingBoard, setOnlyManagingBoard] = React.useState(false);

  const { handleOpenLoginModalFromLink } = useLoginModalStore(
    (state) => ({
      handleOpenLoginModalFromLink: state.handleOpenLoginModalFromLink,
    }),
    shallow,
  );

  const getShareholderStatus = React.useCallback(
    (address: string) => {
      return [
        data.daoManager?.managingBoardAddresses.includes(address) && "ManagingBoard",
        data.daoManager?.shareholdersAddresses.includes(address) && "Shareholder",
        data.daoManager?.contributorsAddresses.includes(address) && "Contributor",
        data.daoManager?.investorsAddresses.includes(address) && "Investor",
      ].filter(Boolean);
    },
    [data],
  );

  const [daoUsers, daoUsersAddresses] = React.useMemo(() => {
    if (!data) {
      return [];
    }

    const balancesSum = data.daoUsers.reduce(
      (sum: number, daoUser: DaoUser) =>
        getShareholderStatus(daoUser.address).length === 0
          ? sum
          : sum + (daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0),
      0,
    );

    const users = data?.daoUsers.reduce((computed: any, daoUser: DaoUser) => {
      const balance = Math.round(daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0);
      computed[daoUser.address] = {
        balance,
        power: ((balance * 100) / balancesSum).toFixed(2),
      };
      return computed;
    }, {});

    const addresses = Object.keys(users)
      .filter((address) => getShareholderStatus(address).length > 0)
      .sort((userA, userB) => users[userB].balance - users[userA].balance);

    return [users, addresses];
  }, [data, getShareholderStatus]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControlLabel
          sx={{ ml: "auto" }}
          control={<Switch checked={onlyManagingBoard} onChange={() => setOnlyManagingBoard((old) => !old)} />}
          label="Show only managing board"
        />
      </Box>
      {!user?.isLoggedIn && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="warning">
            To be able to see shareholders information, please{" "}
            <Link component={NextLink} href="/login" onClick={handleOpenLoginModalFromLink}>
              log in
            </Link>
          </Alert>
        </Box>
      )}
      <Grid container spacing={2}>
        {daoUsersAddresses
          ?.filter(
            (userAddress) =>
              !onlyManagingBoard ||
              (onlyManagingBoard && data.daoManager?.managingBoardAddresses.includes(userAddress)),
          )
          .map((userAddress) => (
            <Grid item xs={12} md={6} lg={4} key={userAddress}>
              <UserCard
                address={userAddress}
                balance={daoUsers[userAddress].balance.toLocaleString()}
                power={daoUsers[userAddress].power}
                statuses={getShareholderStatus(userAddress)}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
