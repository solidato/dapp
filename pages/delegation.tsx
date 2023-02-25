import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import NextLink from "next/link";
import useSWR from "swr";
import { DaoUser } from "types";
import { useAccount } from "wagmi";
import { shallow } from "zustand/shallow";

import * as React from "react";

import { Alert, AlertTitle, Box, Button, CircularProgress, FormControlLabel, Grid, Link, Switch } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getShareholdersInfo } from "@graphql/queries/get-shareholders-info.query";

import { isSameAddress } from "@lib/utils";

import useLoginModalStore from "@store/loginModal";

import useUser from "@hooks/useUser";

import UserCard from "../components/shareholders/UserCard";
import useDelegate from "../hooks/useDelegate";
import useDelegationStatus from "../hooks/useDelegationStatus";

const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

Delegation.title = "Shareholders";
Delegation.requireLogin = true;

export default function Delegation() {
  const { user } = useUser();
  const { address: walletAddress } = useAccount();
  const { data, isLoading } = useSWR(getShareholdersInfo, fetcher);
  const { data: delegationData, isLoading: delegationLoading } = useDelegationStatus();
  const [onlyManagingBoard, setOnlyManagingBoard] = React.useState(false);
  const { onSubmit } = useDelegate();

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
    if (!data || !delegationData) {
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
        canBeDelegated: delegationData.usersList.find((user) => isSameAddress(daoUser.address, user.address))
          ?.canBeDelegated,
      };
      return computed;
    }, {});

    const addresses = Object.keys(users)
      .filter((address) => getShareholderStatus(address).length > 0)
      .sort((userA, userB) => users[userB].balance - users[userA].balance);

    return [users, addresses];
  }, [data, delegationData, getShareholderStatus]);

  const handleDelegate = async (delegatingAddress: string) => onSubmit({ delegatingAddress });

  if (isLoading || delegationLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        <AlertTitle>Heads up</AlertTitle>
        Delegating somebody (i.e. giving a power of attorney) means that this person can use your voting power to vote
        for resolutions in his/her favor (i.e. your tokens are considered as his/her tokens while voting). Delegations
        are a great tool for you if you want to be a passive DAO member. However, you need to acknowledge, that the
        delegated person can vote however he/she wants and does not need a consent from you before each voting takes
        place. Nevertheless, if you ever feel taking an active stance and want to vote personally on a specific
        proposal, your personal choice will override the delegated one in DAO system. In addition, you can always end
        the delegation at your own discretion at any time. Using delegations is not mandatory!
      </Alert>
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
              !isSameAddress(userAddress, walletAddress as string) &&
              (!onlyManagingBoard ||
                (onlyManagingBoard && data.daoManager?.managingBoardAddresses.includes(userAddress))),
          )
          .map((userAddress) => {
            const { balance, power, canBeDelegated } = daoUsers[userAddress];
            return (
              <Grid item xs={12} md={6} lg={4} key={userAddress}>
                <UserCard
                  address={userAddress}
                  balance={balance.toLocaleString()}
                  power={power}
                  statuses={getShareholderStatus(userAddress)}
                  cta={
                    canBeDelegated ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelegate(userAddress)}
                      >
                        Delegate
                      </Button>
                    ) : (
                      <div>ciccio</div>
                    )
                  }
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
