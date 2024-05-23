import NextLink from "next/link";
import { useAccount } from "wagmi";
import { shallow } from "zustand/shallow";

import { ReactElement, useMemo, useState } from "react";

import { CheckCircle, Warning } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  Switch,
  Typography,
} from "@mui/material";

import { isSameAddress } from "@lib/utils";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";
import useLoginModalStore from "@store/loginModal";

import Dialog from "@components/Dialog";
import User from "@components/User";

import useGetActiveResolutions from "@hooks/useGetActiveResolutions";
import useUser from "@hooks/useUser";

import UserCard from "../components/shareholders/UserCard";
import useDelegate from "../hooks/useDelegate";
import useDelegationStatus from "../hooks/useDelegationStatus";
import useShareholders, { DaoUser } from "../hooks/useShareholders";
import { SHAREHOLDERS_ROLES } from "../lib/constants";

Delegation.title = "Shareholders";
Delegation.requireLogin = true;
Delegation.checkMismatch = true;

type DaoUserWithDelegate = DaoUser & { canBeDelegated: boolean | undefined };

export default function Delegation() {
  const { user } = useUser();
  const { address: walletAddress } = useAccount();
  const { daoUsers: shareholders, isLoading, error } = useShareholders();
  const { data: delegationData, isLoading: delegationLoading } = useDelegationStatus();

  const [onlyManagingBoard, setOnlyManagingBoard] = useState(false);
  const { isLoading: isLoadingTransaction } = useBlockchainTransactionStore();
  const { onSubmit } = useDelegate();
  const { activeResolutionsWarning, votingResolutions, noticeResolutions } = useGetActiveResolutions();
  const [activeDelegatingAddress, setActiveDelegatingAddress] = useState<string | null>(null);

  const { handleOpenLoginModalFromLink } = useLoginModalStore(
    (state) => ({
      handleOpenLoginModalFromLink: state.handleOpenLoginModalFromLink,
    }),
    shallow,
  );

  const daoUsers: DaoUserWithDelegate[] = useMemo(() => {
    if (!shareholders || !delegationData) {
      return [];
    }
    return shareholders.map((daoUser) => ({
      ...daoUser,
      canBeDelegated: delegationData.usersList.find((user) => isSameAddress(daoUser.address, user.address))
        ?.canBeDelegated,
    }));
  }, [shareholders, delegationData]);

  const handleDelegate = async (delegatingAddress: string, successElement: ReactElement, errorElement: ReactElement) =>
    onSubmit({ delegatingAddress, successElement, errorElement });

  const getResolutionsNumbers = () =>
    [
      votingResolutions?.length
        ? `${votingResolutions?.length} voting resolution${votingResolutions?.length > 1 ? "s" : ""}`
        : null,
      noticeResolutions?.length
        ? `${noticeResolutions?.length} notice resolution${noticeResolutions?.length > 1 ? "s" : ""}`
        : null,
    ]
      .filter(Boolean)
      .join(" and ");

  if (error) {
    return null;
  }

  if (isLoading || delegationLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Dialog
        open={!!activeDelegatingAddress}
        handleClose={() => setActiveDelegatingAddress(null)}
        disabledConfirm={isLoadingTransaction}
        handleApprove={async () => {
          await handleDelegate(
            activeDelegatingAddress as string,
            <span>
              Successfully removed <User address={activeDelegatingAddress as string} isInline />
            </span>,
            <span>
              Error removing <User address={activeDelegatingAddress as string} isInline />
            </span>,
          );
          setActiveDelegatingAddress(null);
        }}
        title="Heads up"
        descriptionId="dialog-delegate"
        confirmLabel="Yes, proceed"
      >
        <Typography variant="body1">
          Delegation will work only for <b>newly created resolutions</b>. As there are currently active resolutions (
          {getResolutionsNumbers()}), you will need to vote yourself for those!
          <br />
          <br />
          Proceed delegating to <User address={activeDelegatingAddress as string} isInline />?
        </Typography>
      </Dialog>
      <Typography variant="h3" gutterBottom>
        Delegating between shareholders
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        Delegating your voting power to someone else means that they can vote on resolutions using your voting power.{" "}
        <br />
        This is a useful tool if you are going offline for some time (e.g. long holidays) or you want to become a
        passive shareholder. <br />
        <br />
        However, you need to bear in mind the following features of delegations:
        <ol>
          <li>passive shareholders cannot delegate and they cannot be delegated as they have no voting rights;</li>
          <li>
            delegation applies only to resolutions that are announced after you have delegated your voting power
            (delegation does not apply to votings that have already been announced by that time);
          </li>
          <li>
            the person you delegated to can vote however he/she chooses, without needing your consent for each vote;
          </li>
          <li>if the person you have delegated to is excluded from a specific voting, your delegation is neglected;</li>
          <li>if the person you have delegated to looses its voting rights, your delegation is neglected;</li>
          <li>you can always vote and your vote overrules any delegated voting on your behalf;</li>
          <li>
            delegation applies to all the votings that are announced before the cancellation of the delegation
            (delegation is in force with respect of votings announced before the cancellation of the delegation);
          </li>
          <li>
            sub-delegations are not allowed (i.e. person, who has been delegated, cannot delegate; person who has
            delegated, cannot be delegated).
          </li>
        </ol>
        <br />
      </Alert>

      {delegationData?.signerDelegationStatus?.isDelegating && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              onClick={() =>
                handleDelegate(
                  walletAddress as string,
                  <span>
                    Successfully removed{" "}
                    <User address={delegationData?.signerDelegationStatus.delegated as string} isInline />
                  </span>,
                  <span>
                    Error removing{" "}
                    <User address={delegationData?.signerDelegationStatus.delegated as string} isInline />
                  </span>,
                )
              }
              disabled={isLoadingTransaction}
            >
              Remove
            </Button>
          }
        >
          You are currently delegating to{" "}
          <User address={delegationData?.signerDelegationStatus?.delegated as string} isInline />
        </Alert>
      )}
      {delegationData?.signerDelegatedBy.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You are currently being delegated by{" "}
          {delegationData?.signerDelegatedBy.map((u, index) => (
            <span key={u.address}>
              <User address={u.address} isInline inlineVariant="caption" />
              {index < delegationData?.signerDelegatedBy.length - 2 && <span>, </span>}
              {index < delegationData?.signerDelegatedBy.length - 1 &&
                index >= delegationData?.signerDelegatedBy.length - 2 && <span> and </span>}
            </span>
          ))}{" "}
          and as a result, you cannot delegate
        </Alert>
      )}
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
            To see shareholders information, please{" "}
            <Link component={NextLink} href="/login" onClick={handleOpenLoginModalFromLink}>
              log in
            </Link>
          </Alert>
        </Box>
      )}
      <Grid container spacing={2} sx={{ pb: 4 }}>
        {daoUsers
          ?.filter(
            (daoUser) =>
              !isSameAddress(daoUser.address, walletAddress) &&
              (!onlyManagingBoard || (onlyManagingBoard && daoUser.status.includes(SHAREHOLDERS_ROLES.BOARD_MEMBER))),
          )
          .map((daoUser) => {
            const { power, canBeDelegated } = daoUser;
            const isDelegatedByCurrentUser = delegationData?.signerDelegationStatus?.delegated === daoUser.address;
            const ctaCurrentUser = isDelegatedByCurrentUser ? (
              <Chip icon={<CheckCircle />} label="Delegated" variant="filled" color="success" size="small" />
            ) : null;
            const ctaCanBeDelegated =
              canBeDelegated && !ctaCurrentUser ? (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (activeResolutionsWarning) {
                      setActiveDelegatingAddress(daoUser.address);
                      return;
                    }
                    handleDelegate(
                      daoUser.address,
                      <span>
                        Successfully delegating <User address={daoUser.address as string} isInline />
                      </span>,
                      <span>
                        Error delegating <User address={daoUser.address as string} isInline />
                      </span>,
                    );
                  }}
                  disabled={isLoadingTransaction}
                >
                  Delegate
                </Button>
              ) : (
                <Chip icon={<Warning />} label="Can't delegate" variant="outlined" color="warning" size="small" />
              );
            return (
              <Grid item xs={12} md={6} lg={4} key={daoUser.address}>
                <UserCard daoUser={daoUser} cta={ctaCurrentUser || ctaCanBeDelegated} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
