import useSWR from "swr";
import { useAccount } from "wagmi";

import { useMemo } from "react";

import { Alert, Box, Divider, Paper, Stack, Typography } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getResolutionsQuery } from "@graphql/queries/get-resolutions.query";

import { getEnhancedResolutions } from "@lib/resolutions/common";

import Section from "@components/Section";
import User from "@components/User";

import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";

import ResolutionCard from "../components/ResolutionCard";
import { ResolutionEntityEnhanced } from "../types";

Home.renderOnServer = false;
Home.requireLogin = true;
Home.fullWidth = true;

export default function Home() {
  const { address } = useAccount();
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
      <Section
        sx={{ pt: 0 }}
        containerSx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <>
          <div>
            <Typography variant="h3" sx={{ pb: 2 }}>
              Welcome,
            </Typography>
            <User address={address as string} />
          </div>
          <div>Hours widget</div>
        </>
      </Section>
      <Section inverse>
        <>
          <Paper sx={{ p: 4, width: 500 }}>
            <Typography variant="h5" sx={{ pb: 3 }}>
              Resolutions to vote
            </Typography>
            <ResolutionCard resolution={enhancedResolutions[0]} />
          </Paper>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ pb: 3 }}>
              Resolutions overview
            </Typography>
            Total resolutions: X<br />
            Total resolutions quorum: X<br />
            Total resolutions no quorum: X<br />
            Total resolutions rejected: X<br />
          </Paper>
          <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ pb: 3 }}>
                Tasks overview
              </Typography>
              WIP
            </Paper>
          </Stack>
          <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ pb: 3 }}>
                Audit log
              </Typography>
              WIP
            </Paper>
          </Stack>
        </>
      </Section>
    </>
  );
}
