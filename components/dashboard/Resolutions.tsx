import useSWR from "swr";

import { useMemo, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import SwipeableViews from "react-swipeable-views";

import { Box, CircularProgress, Grid, Paper, Skeleton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";

import { fetcher } from "@graphql/client";
import { getResolutionsQuery } from "@graphql/queries/get-resolutions.query";

import { getEnhancedResolutions } from "@lib/resolutions/common";

import ResolutionCard from "@components/ResolutionCard";

import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";

import { RESOLUTION_STATES } from "../../lib/resolutions/common";
import { ResolutionEntityEnhanced } from "../../types";
import CircularProgressWithLabel from "../CircularProgressWithLabel";

const REFRESH_EVERY_MS = 5000;

const emptyStats = {
  withQuorum: 0,
  withoutQuorum: 0,
  rejected: 0,
  withQuorumTot: 0,
  withoutQuorumTot: 0,
  rejectedTot: 0,
};

export default function Resolutions() {
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

    const statsValues = {
      withQuorum: (100 * withQuorum.length) / allResolutions.length,
      withoutQuorum: (100 * withoutQuorum.length) / allResolutions.length,
      rejected: (100 * rejected.length) / allResolutions.length,
      withQuorumTot: withQuorum.length,
      withoutQuorumTot: withoutQuorum.length,
      rejectedTot: rejected.length,
    };

    return [allResolutions, resolutionsToVote, statsValues];
  }, [data?.resolutions, currentTimestamp, acl, isLoading, isLoadingAcl]);
  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={4}
        alignItems="center"
        sx={{ textAlign: "center", mb: 2 }}
        justifyContent="center"
      >
        <Box sx={{ p: { xs: 1, sm: 4 } }}>
          <Typography variant="h5">Total resolutions</Typography>
          <Typography variant="h3">{isLoading ? <Skeleton /> : enhancedResolutions.length}</Typography>
        </Box>
        <Box sx={{ ml: "auto", p: { xs: 1, sm: 4, textAlign: "left" } }}>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", mb: 1.5, pb: 1.5, borderBottom: 1, borderColor: "divider" }}
          >
            <Box component="span" sx={{ mr: 2, width: 130 }}>
              With quorum ({stats.withQuorumTot})
            </Box>
            <CircularProgressWithLabel isLoading={isLoading} value={stats.withQuorum} color="success" />
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", mb: 1.5, pb: 1.5, borderBottom: 1, borderColor: "divider" }}
          >
            <Box component="span" sx={{ mr: 2, width: 130 }}>
              Without quorum ({stats.withoutQuorumTot})
            </Box>
            <CircularProgressWithLabel isLoading={isLoading} value={stats.withoutQuorum} color="warning" />
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <Box component="span" sx={{ mr: 2, width: 130 }}>
              Rejected ({stats.rejectedTot})
            </Box>
            <CircularProgressWithLabel isLoading={isLoading} value={stats.rejected} color="error" />
          </Typography>
        </Box>
      </Stack>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Resolutions to vote
      </Typography>
      {enhancedResolutionsToVote?.length > 0 ? (
        <Grid container spacing={3}>
          {enhancedResolutionsToVote.map((resolution) => (
            <Grid item xs={12} md={6} lg={4} key={resolution.id}>
              <ResolutionCard resolution={resolution} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2">No resolutions to vote right now</Typography>
        </Paper>
      )}
    </>
  );
}
