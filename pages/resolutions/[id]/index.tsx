import Head from "next/head";
import { useRouter } from "next/router";
import showdown from "showdown";
import useSWR from "swr";

import { ReactElement, useEffect, useMemo } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  keyframes,
  useTheme,
} from "@mui/material";

import { fetcherWithParams } from "@graphql/client";
import { getResolutionQuery } from "@graphql/queries/get-resolution.query";

import { RESOLUTION_STATES, getEnhancedResolutionMapper } from "@lib/resolutions/common";
import { enhanceTitleWithPrefix } from "@lib/utils";

import ResolutionInfo from "@components/ResolutionInfo";
import User from "@components/User";
import VotingWidget from "@components/VotingWidget";

import useTimestamp from "@hooks/useTimestamp";

const REFRESH_INTERVAL_MS = 5000;

const gradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

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
    <Box sx={{ pb: resolution.state === RESOLUTION_STATES.VOTING ? 32 : 4 }}>
      <Head>
        <title>{enhanceTitleWithPrefix(`Resolution: ${resolution.title}`, true)}</title>
      </Head>
      {[RESOLUTION_STATES.ENDED, RESOLUTION_STATES.REJECTED].includes(resolution.state) && (
        <Section>
          <>
            {resolution.state === RESOLUTION_STATES.ENDED && (
              <Alert severity={resolution.hasQuorum ? "success" : "error"}>
                {resolution.hasQuorum ? "This resolution has been approved" : "This resolution has not been approved"}
              </Alert>
            )}
            {resolution.state === RESOLUTION_STATES.REJECTED && (
              <Alert severity="error">This resolution has been rejected</Alert>
            )}
          </>
        </Section>
      )}
      {resolution.state === RESOLUTION_STATES.VOTING && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: theme.palette.mode !== "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(33, 33, 33, 0.8)",
            backdropFilter: "blur(4px)",
            isolation: "isolate",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            p: 4,
            borderTop: theme.palette.mode !== "dark" ? "1px solid #DDD" : "1px solid #000",
          }}
        >
          <Paper
            sx={{
              borderRadius: 4,
              p: 4,
              maxWidth: {
                xs: "100%",
                md: "450px",
              },
              width: {
                xs: "90%",
                md: "auto",
              },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(-45deg, #020024, #090979, #00d4ff)"
                  : "linear-gradient(-45deg, rgba(255,255,255,0.8), rgba(220,220,220,0.8))",
              backgroundSize: "400% 400%",
              backdropFilter: "blur(4px)",
              animation: `${gradient} 15s ease infinite`,
              boxShadow: 20,
              "@media print": {
                display: "none",
              },
            }}
          >
            <VotingWidget resolution={resolution} />
          </Paper>
        </Box>
      )}
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
          <Box sx={{ mt: 2 }}>
            <ResolutionInfo resolution={resolution} />
          </Box>
        </>
      </Section>
      <Section>
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
    </Box>
  );
}
