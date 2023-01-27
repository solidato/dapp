import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useSWR from "swr";
import { fetcher } from "@graphql/client";
import { getShareholdersInfo } from "@graphql/queries/get-shareholders-info.query";
import { Chip, Skeleton, Stack } from "@mui/material";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { DaoUser } from "types";
import User from "@components/User";

const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

Shareholders.title = "Shareholders";

export default function Shareholders() {
  const { data, isLoading } = useSWR(getShareholdersInfo, fetcher);

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
    return (
      <>
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
      </>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="shareholders table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Tokens</TableCell>
            <TableCell align="right">Voting Power</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {daoUsersAddresses?.map((address) => (
            <TableRow key={address} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <User address={address} />
              </TableCell>
              <TableCell align="right">{daoUsers[address].balance.toLocaleString()}</TableCell>
              <TableCell align="right">{daoUsers[address].power}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="right">
                  {getShareholderStatus(address).map((status) => (
                    <Chip key={status} label={status} size="small" />
                  ))}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
