import { useWeb3Modal } from "@web3modal/react";
import Link from "next/link";
import useSWR from "swr";
import { useAccount } from "wagmi";

import { useEffect, useMemo, useState } from "react";

import { Box, Button, CircularProgress, FormControlLabel, Grid, Stack, Switch, Typography } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getResolutionsQuery } from "@graphql/queries/get-resolutions.query";

import { getEnhancedResolutions } from "@lib/resolutions/common";

import ResolutionCard from "@components/ResolutionCard";

import useResolutionsAcl from "@hooks/useResolutionsAcl";

import { RESOLUTION_STATES } from "../../lib/resolutions/common";
import { ResolutionEntityEnhanced } from "../../types";

Resolutions.title = "Resolutions";

const REFRESH_EVERY_MS = 3000;

export default function Resolutions() {
  const { isConnected } = useAccount();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { data, isLoading } = useSWR(getResolutionsQuery, fetcher, { refreshInterval: REFRESH_EVERY_MS });
  const { acl, isLoading: isLoadingAcl } = useResolutionsAcl();
  const [includeRejected, setIncludeRejected] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());

  useEffect(() => {
    const intervalCallback = () => {
      setCurrentTimestamp(Date.now());
    };

    const interval = setInterval(intervalCallback, REFRESH_EVERY_MS);

    return () => clearInterval(interval);
  }, []);

  const enhancedResolutions: ResolutionEntityEnhanced[] = useMemo(() => {
    if (isLoading || isLoadingAcl) {
      return [];
    }
    return getEnhancedResolutions(data?.resolutions, currentTimestamp, acl);
  }, [data?.resolutions, currentTimestamp, acl, isLoading, isLoadingAcl]);

  const filteredResolutions = includeRejected
    ? enhancedResolutions
    : enhancedResolutions.filter((resolution) => resolution.state !== RESOLUTION_STATES.REJECTED);

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {isConnected && acl.isContributor && (
          <Stack direction="row" spacing={2}>
            <Button component={Link} href="/resolutions/new" variant="outlined">
              Create new Resolution
            </Button>
            <Button component={Link} href="/resolutions/new?template=monthlyRewards" variant="outlined">
              Monthly Rewards
            </Button>
          </Stack>
        )}
        {!isConnected && (
          <Button onClick={() => openWeb3Modal()} variant="outlined">
            Connect Wallet
          </Button>
        )}
        <FormControlLabel
          control={<Switch checked={includeRejected} onChange={() => setIncludeRejected((old) => !old)} />}
          label="Include rejected"
        />
      </Box>
      {(isLoading || isLoadingAcl) && <CircularProgress />}
      <Grid container spacing={3} justifyContent="space-between">
        {filteredResolutions.map((resolution) => (
          <Grid item xs={12} md={6} lg={4} key={resolution.id}>
            <ResolutionCard resolution={resolution} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
