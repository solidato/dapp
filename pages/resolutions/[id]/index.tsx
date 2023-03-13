import { TelediskoToken__factory } from "@contracts/typechain/factories/contracts/TelediskoToken/TelediskoToken__factory";
import { Interface } from "@ethersproject/abi";
import { formatEther } from "ethers/lib/utils";
import { useRouter } from "next/router";
import showdown from "showdown";
import useSWR from "swr";

import { useEffect, useMemo } from "react";

import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { fetcherWithParams } from "@graphql/client";
import { getResolutionQuery } from "@graphql/queries/get-resolution.query";

import { RESOLUTION_STATES, getEnhancedResolutionMapper } from "@lib/resolutions/common";

import Countdown from "@components/Countdown";
import Section from "@components/Section";
import ExecutionPayload from "@components/resolutions/ExecutionPayload";
import Header from "@components/resolutions/Header";
import LegalInfo from "@components/resolutions/LegalInfo";
import MainInfo from "@components/resolutions/MainInfo";
import VotingBreakdown from "@components/resolutions/VotingBreakdown";
import VotingSection from "@components/resolutions/VotingSection";
import VotingUsers from "@components/resolutions/VotingUsers";

import useTimestamp from "@hooks/useTimestamp";

const REFRESH_INTERVAL_MS = 5000;

const converter = new showdown.Converter();
converter.setFlavor("github");

ResolutionView.fullWidth = true;

export default function ResolutionView() {
  const router = useRouter();
  const { currentTimestamp } = useTimestamp();

  const { data: resolutionData, isLoading: isLoadingResolution } = useSWR(
    [getResolutionQuery, { id: router.query.id }],
    fetcherWithParams,
    { refreshInterval: REFRESH_INTERVAL_MS },
  );

  const notFound = resolutionData && !resolutionData.resolution;

  useEffect(() => {
    if (router.query?.viewMode === "print" && !isLoadingResolution && !notFound) {
      window.print();
      window.close();
    }
  }, [router.query, notFound, isLoadingResolution]);

  const resolution = useMemo(() => {
    if (resolutionData?.resolution) {
      return getEnhancedResolutionMapper(+currentTimestamp)(resolutionData.resolution);
    }
    return null;
  }, [resolutionData?.resolution, currentTimestamp]);

  const executionPayload = useMemo(() => {
    if ((resolution?.executionData || []).length > 0) {
      const contractInterface = new Interface(TelediskoToken__factory.abi);
      return (resolution?.executionData || [])?.map((data) => {
        const {
          args: [address, tokens],
        } = contractInterface.parseTransaction({ data });
        return {
          address,
          tokens: formatEther(tokens),
        };
      });
    }
    return [];
  }, [resolution]);

  if (isLoadingResolution) {
    return (
      <Section>
        <CircularProgress />
      </Section>
    );
  }

  if (notFound || !resolution) {
    return (
      <Section>
        <Alert severity="warning">Resolution not found</Alert>
      </Section>
    );
  }

  return (
    <Box sx={{ pb: resolution.state === RESOLUTION_STATES.VOTING ? 32 : 4 }}>
      <Header resolution={resolution} executionPayload={executionPayload} />
      {resolution.state === RESOLUTION_STATES.VOTING && <VotingSection resolution={resolution} />}
      <Section>
        <LegalInfo resolution={resolution} />
      </Section>
      <Section inverse>
        <MainInfo resolution={resolution} />
      </Section>
      <Section pageBreak>
        <>
          <Typography variant="h5">Content of the resolution:</Typography>
          <Box
            sx={{
              p: { xs: 2, md: 4 },
              pl: { xs: 4, md: 6 },
              mt: 4,
              bgcolor: "background.paper",
              borderLeft: "1px solid",
              borderLeftColor: "primary.light",
              "& a": { color: "primary.main", textDecoration: "none" },
            }}
            dangerouslySetInnerHTML={{ __html: converter.makeHtml(resolution.content) }}
          />
        </>
      </Section>
      {[RESOLUTION_STATES.NOTICE, RESOLUTION_STATES.PRE_DRAFT, RESOLUTION_STATES.VOTING].includes(resolution.state) && (
        <Section inverse>
          <>
            <Typography variant="h5">Voting conditions:</Typography>
            {resolution.isNegative ? (
              <span>
                <b>{resolution.resolutionType.quorum}% of negative votes</b> are needed to approve the motion
              </span>
            ) : (
              <span>
                <b>{resolution.resolutionType.quorum}% of votes</b> are needed to approve the motion
              </span>
            )}
          </>
        </Section>
      )}
      {[RESOLUTION_STATES.VOTING, RESOLUTION_STATES.ENDED].includes(resolution.state) && (
        <>
          <Section inverse pageBreak>
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Voting Summary:
              </Typography>
              <VotingBreakdown resolution={resolution} />
            </>
          </Section>
          <Section>
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Contributors voting:
              </Typography>
              <VotingUsers voters={resolution.voters} />
            </>
          </Section>
        </>
      )}
      {(executionPayload || []).length > 0 && resolution.state !== RESOLUTION_STATES.REJECTED && (
        <Section noPrint>
          <ExecutionPayload resolution={resolution} executionPayload={executionPayload} />
        </Section>
      )}
      <Box
        sx={{
          display: "none",
          "@media print": {
            display: "block",
            pageBreakBefore: "always",
          },
        }}
      >
        <Section>
          <>
            <Typography variant="body2">/signed digitally/</Typography>
            <Typography variant="body2">--------------------------------------</Typography>
            <Typography variant="body2">Benjamin Gregor Uphues</Typography>
            <Typography variant="body2">Member of management board</Typography>
          </>
        </Section>
      </Box>
    </Box>
  );
}
