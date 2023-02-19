import Head from "next/head";
import { useRouter } from "next/router";
import showdown from "showdown";
import useSWR from "swr";

import { ReactElement, useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Slide,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { fetcherWithParams } from "@graphql/client";
import { getResolutionQuery } from "@graphql/queries/get-resolution.query";

import { RESOLUTION_STATES, getEnhancedResolutionMapper } from "@lib/resolutions/common";
import { enhanceTitleWithPrefix } from "@lib/utils";

import ResolutionInfo from "@components/ResolutionInfo";
import User from "@components/User";

import useTimestamp from "@hooks/useTimestamp";

const REFRESH_INTERVAL_MS = 5000;
const VOTING_IN_APPEAR_MS = 1000;

const converter = new showdown.Converter();
converter.setFlavor("github");

ResolutionView.fullWidth = true;

const Section = ({ children, inverse = false }: { children: ReactElement; inverse?: boolean }) => (
  <Box sx={{ pt: 4, pb: 4, ...(inverse && { bgcolor: "background.paper" }) }}>
    <Container maxWidth="lg">{children}</Container>
  </Box>
);

export default function ResolutionView() {
  const router = useRouter();
  const { currentTimestamp } = useTimestamp();
  const theme = useTheme();
  const [votingIn, setVotingIn] = useState(false);

  const { data: resolutionData, isLoading: isLoadingResolution } = useSWR(
    [getResolutionQuery, { id: router.query.id }],
    fetcherWithParams,
    { refreshInterval: REFRESH_INTERVAL_MS },
  );

  const notFound = resolutionData && !resolutionData.resolution;

  useEffect(() => {
    if (router.query?.viewMode === "print" && !isLoadingResolution && !notFound) {
      window.print();
    }
  }, [router.query, notFound, isLoadingResolution]);

  useEffect(() => {
    const to = setTimeout(() => setVotingIn(true), VOTING_IN_APPEAR_MS);

    return () => clearTimeout(to);
  }, []);

  const resolution = useMemo(() => {
    if (resolutionData?.resolution) {
      return getEnhancedResolutionMapper(+currentTimestamp)(resolutionData.resolution);
    }
    return null;
  }, [resolutionData?.resolution, currentTimestamp]);

  if (isLoadingResolution) {
    return <CircularProgress />;
  }

  if (notFound || !resolution) {
    return <Alert severity="warning">Resolution not found</Alert>;
  }

  return (
    <Box sx={{ pb: 12 }}>
      <Head>
        <title>{enhanceTitleWithPrefix(`Resolution: ${resolution.title}`, true)}</title>
      </Head>
      <Slide direction="up" mountOnEnter unmountOnExit in={votingIn}>
        <Paper
          sx={{
            position: "fixed",
            isolation: "isolate",
            zIndex: 1,
            borderRadius: 4,
            bottom: 20,
            width: "50%",
            p: 4,
            left: "50%",
            ml: "-25%",
            backgroundColor: theme.palette.mode !== "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(4px)",
          }}
          elevation={3}
        >
          Voting/execution widget (or connect wallet)
        </Paper>
      </Slide>
      <Section>
        <Stack
          direction={{ xs: "column", md: "row-reverse" }}
          spacing={{ xs: 1, md: 4 }}
          alignItems={{ md: "center" }}
          justifyContent={{ md: "space-between" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2">
              <b>Business name:</b> neokingdom DAO OÜ
            </Typography>
            <Typography variant="body2">
              <b>Registry code:</b> 16638166
            </Typography>
            <Typography variant="body2">
              <b>Registered office</b>: Laki 11/1, 12915 Tallinn, Estonia
            </Typography>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2">
              <b>Time of determining the voting rights and active PoAs:</b> neokingdom DAO OÜ
            </Typography>
            <Typography variant="body2">
              <b>Notification period for voting:</b> 16638166
            </Typography>
            <Typography variant="body2">
              <b>Voting period:</b> Laki 11/1, 12915 Tallinn, Estonia
            </Typography>
            <Typography variant="body2">
              <b>Place of voting:</b> Laki 11/1, 12915 Tallinn, Estonia
            </Typography>
            <Typography variant="body2">
              <b>Recording secretary:</b> Benjamin Gregor Uphues
            </Typography>
          </Paper>
          <Typography variant="h6">
            {resolution.state !== RESOLUTION_STATES.ENDED ? (
              <span>
                DRAFT RESOLUTION OF THE SHAREHOLDERS
                <br />
                (without convening a meeting of shareholders)
              </span>
            ) : (
              <span>
                MINUTES AND RESOLUTION OF THE SHAREHOLDERS
                <br />
                (without convening a meeting of shareholders)
              </span>
            )}
          </Typography>
        </Stack>
      </Section>
      <Section inverse>
        <>
          <Typography variant="h5">Topic of the resolution: {resolution.title}</Typography>
          <Typography variant="body2" sx={{ pt: 1, pb: 0.5 }}>
            Created on {resolution.createdAt} by
          </Typography>
          <User address={resolution.createBy} />
          <ResolutionInfo resolution={resolution} />
        </>
      </Section>
      <Section>
        <>
          <Typography variant="h5">Content of the resolution:</Typography>
          <Box
            sx={{
              p: 4,
              pl: 6,
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
    </Box>
  );
}
