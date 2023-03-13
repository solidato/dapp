import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

import { Alert, AlertTitle, Button } from "@mui/material";

import Section from "@components/Section";
import Header from "@components/dashboard/Header";

import Resolutions from "../components/dashboard/Resolutions";
import Tasks from "../components/dashboard/Tasks";

Home.renderOnServer = false;
Home.requireLogin = true;
Home.fullWidth = true;

export default function Home() {
  const { address } = useAccount();
  const { open: openWeb3Modal } = useWeb3Modal();

  return (
    <>
      {!address && (
        <Section>
          <Alert
            severity="warning"
            action={
              <Button variant="outlined" color="warning" size="small" onClick={() => openWeb3Modal()}>
                Connect
              </Button>
            }
          >
            <AlertTitle>Heads up</AlertTitle>
            It looks you&apos;re just connected through odoo. You should also connect your wallet for a smooth
            experience in the dapp
          </Alert>
        </Section>
      )}
      <Section
        sx={{ pt: 0 }}
        containerSx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <Header />
      </Section>
      <Section inverse>
        <Resolutions />
      </Section>
      <Section>
        <Tasks />
      </Section>
    </>
  );
}
