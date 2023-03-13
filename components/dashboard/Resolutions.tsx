import useSWR from "swr";

import { useMemo } from "react";

import { Paper, Typography } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getResolutionsQuery } from "@graphql/queries/get-resolutions.query";

import { getEnhancedResolutions } from "@lib/resolutions/common";

import ResolutionCard from "@components/ResolutionCard";

import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";

import { ResolutionEntityEnhanced } from "../../types";

export default function Resolutions() {
  const { data, isLoading } = useSWR(getResolutionsQuery, fetcher, { refreshInterval: 4000 });
  const { acl, isLoading: isLoadingAcl } = useResolutionsAcl();
  const { currentTimestamp } = useTimestamp();

  const enhancedResolutions: ResolutionEntityEnhanced[] = useMemo(() => {
    if (isLoading || isLoadingAcl) {
      return [];
    }
    return getEnhancedResolutions(data?.resolutions, +currentTimestamp, acl);
  }, [data?.resolutions, currentTimestamp, acl, isLoading, isLoadingAcl]);

  return (
    <>
      {enhancedResolutions?.length > 0 && <ResolutionCard resolution={enhancedResolutions[0]} />}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ pb: 3 }}>
          Resolutions overview
        </Typography>
        Total resolutions: X<br />
        Total resolutions quorum: X<br />
        Total resolutions no quorum: X<br />
        Total resolutions rejected: X<br />
      </Paper>
    </>
  );
}
