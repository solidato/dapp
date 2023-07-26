import { useChain, useWallet } from "@cosmos-kit/react";
import { useKeplrContext } from "contexts/KeplrContext";

import { useEffect } from "react";

import { Alert, Button, Grid } from "@mui/material";

import IBCBalanceCrescent from "@components/ibc/IBCBalanceCrescent";
import IBCBalanceEvmos from "@components/ibc/IBCBalanceEvmos";

const chainNames = ["evmos", "crescent"];

export default function IBC() {
  const isKeplrWallet = !!window.keplr;
  const isLeapWallet = !!window.leap;

  const {
    username: evmosAccountName,
    connect: connectEvmosWallet,
    disconnect: disconnectEvmosWallet,
    address: evmosAddress,
    wallet: evmosWallet,
  } = useChain(chainNames[0]);

  const {
    username: crescentAccountName,
    connect: connectCrescentWallet,
    disconnect: disconnectCrescentWallet,
    address: crescentAddress,
    wallet: crescentWallet,
  } = useChain(chainNames[1]);

  const { status: walletStatus, mainWallet } = useWallet();

  useEffect(() => {
    const fn = async () => {
      await mainWallet?.connect();
    };
    fn();
  }, [mainWallet]);

  if (!isKeplrWallet && !isLeapWallet)
    return (
      <Alert
        severity="warning"
        action={
          <>
            <Button size="small" variant="outlined" href="https://www.keplr.app/" target="_blank">
              Install Keplr
            </Button>
            <Button sx={{ ml: 2 }} size="small" variant="outlined" href="https://www.keplr.app/" target="_blank">
              Install Leap
            </Button>
          </>
        }
      >
        It looks you don&apos;t have a supported wallet installed. Please install Keplr or Leap wallet to use this
        feature.
      </Alert>
    );

  if (walletStatus === "Disconnected") {
    return (
      <Alert
        severity="info"
        action={
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              connectEvmosWallet();
              connectCrescentWallet();
            }}
          >
            Connect Wallet
          </Button>
        }
        sx={{ mb: 2 }}
      >
        Please connect your Wallet
      </Alert>
    );
  }

  if (walletStatus === "Connecting") {
    return (
      <Alert sx={{ width: "100%" }} severity="info">
        Connecting to your wallet...
      </Alert>
    );
  }

  return (
    <>
      {walletStatus === "Connected" && (
        <Alert
          severity="info"
          action={
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                disconnectEvmosWallet();
                disconnectCrescentWallet();
              }}
            >
              Disconnect Wallet
            </Button>
          }
          sx={{ mb: 2 }}
        >
          You&apos;re connected to <strong>{evmosWallet?.prettyName} Wallet</strong>. Account Name:{" "}
          <strong>{evmosAccountName}</strong>.
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <IBCBalanceEvmos />
        </Grid>
        <Grid item xs={12}>
          <IBCBalanceCrescent />
        </Grid>
      </Grid>
    </>
  );
}
