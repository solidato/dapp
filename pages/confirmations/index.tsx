import Link from "next/link";
import { ResolutionEntity } from "types";
import { useAccount } from "wagmi";

import { useMemo } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

import { getEnhancedResolutions } from "@lib/resolutions/common";
import { RESOLUTION_STATES } from "@lib/resolutions/common";
import { isSameAddress } from "@lib/utils";

import ResolutionCard from "@components/ResolutionCard";
import Section from "@components/Section";

import useGetResolutions from "@hooks/useGetResolutions";
import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";
import useUser from "@hooks/useUser";

Confirmations.title = "Confirmations";
Confirmations.checkMismatch = true;
Confirmations.fullWidth = true;

export default function Confirmations() {
  const { isConnected, address } = useAccount();
  const { acl, isLoading: isLoadingAcl } = useResolutionsAcl();
  const { currentTimestamp } = useTimestamp();
  const { user } = useUser();
  const { resolutions, isLoading, error } = useGetResolutions();

  const enhancedResolutions = useMemo(() => {
    if ((isLoading || isLoadingAcl) && resolutions.length === 0) {
      return [];
    }
    return getEnhancedResolutions(resolutions as ResolutionEntity[], +currentTimestamp, acl);
  }, [resolutions, currentTimestamp, acl, isLoading, isLoadingAcl]);

  const filteredResolutions = useMemo(() => {
    return enhancedResolutions.filter((r) => r.resolutionType.name === "confirmation");
  }, [enhancedResolutions]);

  const [activeResolutions, inactiveResolutions] = useMemo(() => {
    const active = filteredResolutions.filter((resolution) => {
      const votingUser = address
        ? resolution.votingStatus.votersHaveVoted.find((voter) => isSameAddress(voter.address, address))
        : null;
      return resolution.state === RESOLUTION_STATES.VOTING && !votingUser && user?.isLoggedIn;
    });
    const inactive = filteredResolutions.filter((resolution) => {
      const votingUser = address
        ? resolution.votingStatus.votersHaveVoted.find((voter) => isSameAddress(voter.address, address))
        : null;
      return resolution.state !== RESOLUTION_STATES.VOTING || !!votingUser || !user?.isLoggedIn;
    });
    return [active, inactive];
  }, [filteredResolutions, address, user?.isLoggedIn]);

  if (error) {
    return null;
  }

  return (
    <>
      <Section sx={{ pb: 0 }}>
        <>
          <Typography variant="h3" gutterBottom>
            Shareholders&apos; Confirmations
          </Typography>
          <Alert severity="info" sx={{ mb: 4 }}>
            Shareholders Confirmations description
          </Alert>
        </>
      </Section>
      {isConnected && acl.isContributor && (
        <Section sx={{ pt: 0 }}>
          <Box sx={{ display: { md: "flex" }, alignItems: "center" }}>
            <Button
              sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 1, md: 0 }, mr: { md: 2 } }}
              component={Link}
              href="/confirmations/new"
              variant="outlined"
            >
              <AddIcon sx={{ mr: 1 }} /> New Confirmation
            </Button>
          </Box>
        </Section>
      )}
      {activeResolutions?.length > 0 && (
        <Section inverse>
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Confirmations you need to vote
            </Typography>
            <Grid container spacing={3}>
              {activeResolutions.map((resolution) => (
                <Grid item xs={12} md={6} lg={4} key={resolution.id}>
                  <ResolutionCard resolution={resolution} />
                </Grid>
              ))}
            </Grid>
          </>
        </Section>
      )}
      {filteredResolutions?.length > 0 && (
        <Section inverse={activeResolutions?.length === 0}>
          <>
            {activeResolutions?.length > 0 && (
              <Typography variant="h5" sx={{ mb: 2 }}>
                Other Confirmations
              </Typography>
            )}
            {(isLoading || isLoadingAcl) && filteredResolutions?.length === 0 && <CircularProgress />}
            <Grid container spacing={3}>
              {inactiveResolutions.map((resolution) => (
                <Grid item xs={12} md={6} lg={4} key={resolution.id}>
                  <ResolutionCard resolution={resolution} />
                </Grid>
              ))}
            </Grid>
          </>
        </Section>
      )}
    </>
  );
}
