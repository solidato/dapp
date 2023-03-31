import { useWeb3Modal } from "@web3modal/react";
import useSWR from "swr";
import { useAccount } from "wagmi";

import { useMemo } from "react";

import { Alert, AlertTitle, Button, Grid, Paper, Typography } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getResolutionsQuery } from "@graphql/queries/get-resolutions.query";

import { RESOLUTION_STATES, getEnhancedResolutions } from "@lib/resolutions/common";

import ResolutionCard from "@components/ResolutionCard";
import Section from "@components/Section";
import Header from "@components/dashboard/Header";
import Resolutions from "@components/dashboard/ResolutionsStats";
import Tasks from "@components/dashboard/Tasks";

import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";

import ResolutionsStats from "../components/dashboard/ResolutionsStats";
import { ResolutionEntityEnhanced } from "../types";

Home.renderOnServer = false;
Home.requireLogin = true;
Home.fullWidth = true;

const REFRESH_EVERY_MS = 5000;

const emptyStats = {
  withQuorum: 0,
  withoutQuorum: 0,
  rejected: 0,
  withQuorumTot: 0,
  withoutQuorumTot: 0,
  rejectedTot: 0,
};

export default function Home() {
  const { address } = useAccount();
  const { open: openWeb3Modal } = useWeb3Modal();

  const { data, isLoading } = useSWR<any>(getResolutionsQuery, fetcher, { refreshInterval: REFRESH_EVERY_MS });

  const { acl, isLoading: isLoadingAcl } = useResolutionsAcl();
  const { currentTimestamp } = useTimestamp();

  const [enhancedResolutions, enhancedResolutionsToVote, stats]: [
    ResolutionEntityEnhanced[],
    ResolutionEntityEnhanced[],
    typeof emptyStats,
  ] = useMemo(() => {
    if (isLoading || isLoadingAcl) {
      return [[], [], emptyStats];
    }

    const allResolutions = getEnhancedResolutions(data?.resolutions, +currentTimestamp, acl);

    const resolutionsToVote = allResolutions.filter((res) => res.state === RESOLUTION_STATES.VOTING);
    const withQuorum = allResolutions.filter((res) => res.state === RESOLUTION_STATES.ENDED && res.hasQuorum);
    const withoutQuorum = allResolutions.filter((res) => res.state === RESOLUTION_STATES.ENDED && !res.hasQuorum);
    const rejected = allResolutions.filter((res) => res.state === RESOLUTION_STATES.REJECTED);
    const typesTotals = allResolutions.reduce((totals, res) => {
      const name = res.isNegative ? `${res.resolutionType.name}Veto` : res.resolutionType.name;
      totals[name] = (totals[name] || 0) + 1;
      return totals;
    }, {} as any);

    const statsValues = {
      withQuorum: (100 * withQuorum.length) / allResolutions.length,
      withoutQuorum: (100 * withoutQuorum.length) / allResolutions.length,
      rejected: (100 * rejected.length) / allResolutions.length,
      withQuorumTot: withQuorum.length,
      withoutQuorumTot: withoutQuorum.length,
      rejectedTot: rejected.length,
      typesTotals,
    };

    return [allResolutions, resolutionsToVote, statsValues];
  }, [data?.resolutions, currentTimestamp, acl, isLoading, isLoadingAcl]);

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
        containerSx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Header />
      </Section>
      {enhancedResolutionsToVote?.length > 0 && (
        <Section inverse>
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Resolutions to vote
            </Typography>
            <Grid container spacing={3}>
              {enhancedResolutionsToVote.map((resolution) => (
                <Grid item xs={12} md={6} lg={4} key={resolution.id}>
                  <ResolutionCard resolution={resolution} />
                </Grid>
              ))}
            </Grid>
          </>
        </Section>
      )}
      <Section inverse={enhancedResolutionsToVote?.length === 0}>
        <Tasks />
      </Section>
      <Section inverse={enhancedResolutionsToVote?.length > 0}>
        <ResolutionsStats stats={stats} isLoading={isLoading} totalResolutions={enhancedResolutions.length} />
      </Section>
    </>
  );
}
