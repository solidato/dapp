import { useAccount } from "wagmi";

import { useMemo } from "react";

import { Grid, Typography } from "@mui/material";

import { RESOLUTION_STATES, getEnhancedResolutions, getVotingPercentage } from "@lib/resolutions/common";

import ResolutionCard from "@components/ResolutionCard";
import Section from "@components/Section";
import CompanyTabs from "@components/dashboard/CompanyTabs";
import Header from "@components/dashboard/Header";
import ShareholdingValue from "@components/dashboard/ShareholdingValue";
import Tokens from "@components/dashboard/Tokens";

import useGetResolutions from "@hooks/useGetResolutions";
import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";
import useUser from "@hooks/useUser";

import ResolutionsStats from "../components/dashboard/ResolutionsStats";
import { ResolutionEntity, ResolutionEntityEnhanced } from "../types";

Home.renderOnServer = false;
Home.requireLogin = true;
Home.fullWidth = true;
Home.checkMismatch = true;

const emptyStats = {
  withQuorum: 0,
  withoutQuorum: 0,
  rejected: 0,
  withQuorumTot: 0,
  withoutQuorumTot: 0,
  rejectedTot: 0,
};

export default function Home() {
  const { resolutions, isLoading, error } = useGetResolutions();

  const { acl, isLoading: isLoadingAcl } = useResolutionsAcl();
  const { currentTimestamp } = useTimestamp();
  const { isConnected } = useAccount();

  const enhancedResolutionsToVote = useMemo(() => {
    if (isLoading || isLoadingAcl || error) {
      return [];
    }

    const allResolutions = getEnhancedResolutions(resolutions as ResolutionEntity[], +currentTimestamp, acl);
    return allResolutions.filter((res) => res.state === RESOLUTION_STATES.VOTING);
  }, [resolutions, currentTimestamp, acl, isLoading, isLoadingAcl, error]);

  return (
    <>
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
      {!error && (
        <>
          <Section inverse>
            <CompanyTabs />
          </Section>
          {enhancedResolutionsToVote.length > 0 && (
            <Section inverse={false}>
              <>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Upcoming and ongoing votes
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
          {isConnected && (
            <Section inverse={enhancedResolutionsToVote.length > 0}>
              <Tokens />
            </Section>
          )}
          <Section inverse={enhancedResolutionsToVote.length === 0}>
            <>
              <Typography variant="h4" sx={{ mb: 4 }} textAlign="center">
                Shareholding&apos;s value
              </Typography>
              <ShareholdingValue />
            </>
          </Section>
        </>
      )}
    </>
  );
}
