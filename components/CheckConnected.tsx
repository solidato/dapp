import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

import { Alert, AlertTitle, Box, Button } from "@mui/material";

import useUser from "@hooks/useUser";

import Section from "./Section";

export default function CheckConnected({ fullWidth = false }: { fullWidth?: boolean }) {
  const { isConnected } = useAccount();
  const { user } = useUser();
  const { open: openWeb3Modal } = useWeb3Modal();

  if (isConnected || !user?.isLoggedIn) {
    return null;
  }

  const Component = fullWidth ? Section : Box;

  return (
    <Component sx={{ mb: fullWidth ? 0 : 2 }}>
      <Alert
        severity="warning"
        action={
          <Button variant="outlined" color="warning" size="small" onClick={() => openWeb3Modal()}>
            Connect
          </Button>
        }
      >
        <AlertTitle>Heads up</AlertTitle>
        It looks you&apos;re just connected through odoo. You should also connect your wallet for a smooth experience in
        the dapp
      </Alert>
    </Component>
  );
}
